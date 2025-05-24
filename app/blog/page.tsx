'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useBlogPosts } from '../hooks/useBlogPosts';
import React, { useState } from 'react';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

// 記事のカテゴリに応じた絵文字を返す関数
function getCategoryEmoji(category: string): string {
  const lowerCategory = category?.toLowerCase() || '';

  if (lowerCategory.includes('react')) return '⚛️';
  if (lowerCategory.includes('docker')) return '🐳';
  if (lowerCategory.includes('kubernetes')) return '☸️';
  if (lowerCategory.includes('linux')) return '🐧';
  if (lowerCategory.includes('学習')) return '📚';
  if (lowerCategory.includes('project')) return '🚀';

  // デフォルト
  return '💻';
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const { posts, loading, error, totalPages } = useBlogPosts(currentPage, postsPerPage);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('すべて');

  // 検索とフィルタリングを適用した記事リスト
  const filteredPosts = posts.filter(post => {
    // 検索条件
    const searchMatch = searchTerm === '' || 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stripHtml(post.excerpt.rendered).toLowerCase().includes(searchTerm.toLowerCase());

    // カテゴリフィルター
    const categoryMatch = activeFilter === 'すべて' || 
      (post._embedded?.['wp:term']?.[0]?.some(term => 
        term.name.toLowerCase().includes(activeFilter.toLowerCase())
      ));

    return searchMatch && categoryMatch;
  });

  // Reset to page 1 when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  if (loading) {
    return (
      <div className="container">
        <section className="hero">
          <h1>Tech Blog</h1>
          <p>今までに学んだ技術などの備忘録</p>
        </section>

        <section className="search-filter">
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="記事を検索..." aria-label="記事を検索" disabled value="" />
          </div>
          <div className="filter-tags" role="tablist" aria-label="記事フィルター">
            <button className="tag active" role="tab" aria-selected="true">すべて</button>
            <button className="tag" role="tab" aria-selected="false">React</button>
            <button className="tag" role="tab" aria-selected="false">Laravel</button>
            <button className="tag" role="tab" aria-selected="false">Docker</button>
            <button className="tag" role="tab" aria-selected="false">Kubernetes</button>
            <button className="tag" role="tab" aria-selected="false">Linux</button>
            <button className="tag" role="tab" aria-selected="false">学習記録</button>
            <button className="tag" role="tab" aria-selected="false">プロジェクト</button>
          </div>
        </section>

        <section className="blog-grid" role="main" aria-label="ブログ記事一覧">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="article-card" tabIndex={0} role="article">
              <div className="article-image">
                <span className="article-emoji">
                  <div className="loading"></div>
                </span>
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <div className="article-date">読み込み中...</div>
                  <div className="article-category">Loading</div>
                </div>
                <div className="h-7 bg-slate-200 rounded-lg mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/5"></div>
                </div>
                <div className="h-10 bg-slate-200 rounded-full w-32"></div>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  if (error) {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';

    return (
      <div className="container">
        <section className="hero">
          <h1>Tech Blog</h1>
          <p>記事の読み込みに失敗しました</p>
        </section>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-200/50 p-12 text-center border border-white/20 max-w-4xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">記事の読み込みに失敗しました</h2>
          <p className="text-slate-600 mb-4 text-lg">
            WordPress サーバー ({wordpressUrl}) が起動しているか確認してください。
          </p>
          <p className="text-sm text-slate-500 mb-8 font-mono bg-slate-100 rounded-lg p-3">
            エラー詳細: {error}
          </p>
          <button 
            className="search-btn"
            onClick={() => window.location.reload()}
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container">
        <section className="hero">
          <h1>Tech Blog</h1>
          <p>記事がまだありません</p>
        </section>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 p-12 text-center border border-white/20 max-w-4xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">記事がありません</h2>
          <p className="text-slate-600 text-lg">まだ記事が投稿されていません。しばらくお待ちください。</p>
        </div>
      </div>
    );
  }

  // 記事からカテゴリを抽出
  const categories = ['すべて'];
  posts.forEach(post => {
    post._embedded?.['wp:term']?.[0]?.forEach(term => {
      if (!categories.includes(term.name)) {
        categories.push(term.name);
      }
    });
  });

  return (
    <div className="container">
      <section className="hero">
        <h1>Tech Blog</h1>
        <p>今までに学んだ技術などの備忘録</p>
      </section>

      <section className="search-filter">
        <div className="search-bar">
          <input 
            type="text" 
            className="search-input" 
            placeholder="記事を検索..." 
            aria-label="記事を検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tags" role="tablist" aria-label="記事フィルター">
          {categories.map(category => (
            <button 
              key={category}
              className={`tag ${activeFilter === category ? 'active' : ''}`} 
              role="tab" 
              aria-selected={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="blog-grid" role="main" aria-label="ブログ記事一覧">
        {(() => {
          // Calculate which posts to display based on current page
          const isFiltered = searchTerm !== '' || activeFilter !== 'すべて';

          // If filtering is applied, paginate the filtered posts
          // Otherwise, display all posts from the current API page
          const displayPosts = isFiltered
            ? (() => {
                const startIndex = (currentPage - 1) * postsPerPage;
                const endIndex = startIndex + postsPerPage;
                return filteredPosts.slice(startIndex, endIndex);
              })()
            : filteredPosts;

          return displayPosts.map((post) => {
            // カテゴリ名を取得
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'その他';
            const emoji = getCategoryEmoji(category);

            return (
              <article 
                key={post.id} 
                className="article-card" 
                tabIndex={0} 
                role="article"
                onClick={() => router.push(`/blog/${post.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="article-image">
                  {post._embedded?.['wp:featuredmedia']?.[0] ? (
                    <Image 
                      src={post._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="article-emoji">{emoji}</span>
                  )}
                </div>
                <div className="article-content">
                  <div className="article-meta">
                    <time className="article-date" dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="article-category">{category}</span>
                  </div>
                  <h2 
                    className="article-title"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="article-excerpt">
                    {stripHtml(post.excerpt.rendered).substring(0, 150)}
                    {stripHtml(post.excerpt.rendered).length > 150 ? '...' : ''}
                  </p>
                  <div className="article-tags">
                    {post._embedded?.['wp:term']?.[1]?.map(tag => (
                      <span key={tag.id} className="article-tag">{tag.name}</span>
                    ))}
                  </div>
                  <button
                    className="read-more"
                    aria-label={`${post.title.rendered}の記事を読む`}
                  >
                    続きを読む
                  </button>
                </div>
              </article>
            );
          });
        })()}
      </section>

      {filteredPosts.length > 0 && (
        <nav className="pagination" aria-label="ページネーション">
          {/* Calculate effective total pages based on whether filtering is applied */}
          {(() => {
            // If no filtering or search is applied, use the API's totalPages
            // Otherwise, calculate based on filtered posts
            const isFiltered = searchTerm !== '' || activeFilter !== 'すべて';
            const effectiveTotalPages = isFiltered 
              ? Math.ceil(filteredPosts.length / postsPerPage)
              : totalPages;

            // Ensure current page is valid
            const effectiveCurrentPage = Math.min(currentPage, effectiveTotalPages || 1);

            if (effectiveTotalPages === 0) return null;

            return (
              <>
                {/* Previous page button */}
                {effectiveCurrentPage > 1 && (
                  <button 
                    className="page-btn" 
                    aria-label="前のページへ"
                    onClick={() => setCurrentPage(effectiveCurrentPage - 1)}
                  >
                    前へ
                  </button>
                )}

                {/* Generate page buttons dynamically */}
                {Array.from({ length: effectiveTotalPages }, (_, i) => i + 1)
                  .filter(pageNum => {
                    // Show first page, last page, current page, and pages around current page
                    return pageNum === 1 || 
                           pageNum === effectiveTotalPages || 
                           (pageNum >= effectiveCurrentPage - 1 && pageNum <= effectiveCurrentPage + 1);
                  })
                  .map((pageNum, index, array) => {
                    // Add ellipsis if there are gaps in the sequence
                    const showEllipsisBefore = index > 0 && pageNum > array[index - 1] + 1;
                    const showEllipsisAfter = index < array.length - 1 && pageNum < array[index + 1] - 1;

                    return (
                      <React.Fragment key={pageNum}>
                        {showEllipsisBefore && <span className="page-ellipsis">...</span>}
                        <button 
                          className={`page-btn ${effectiveCurrentPage === pageNum ? 'active' : ''}`} 
                          aria-current={effectiveCurrentPage === pageNum ? 'page' : undefined}
                          aria-label={`${pageNum}ページ目へ`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                        {showEllipsisAfter && <span className="page-ellipsis">...</span>}
                      </React.Fragment>
                    );
                  })}

                {/* Next page button */}
                {effectiveCurrentPage < effectiveTotalPages && (
                  <button 
                    className="page-btn" 
                    aria-label="次のページへ"
                    onClick={() => setCurrentPage(effectiveCurrentPage + 1)}
                  >
                    次へ
                  </button>
                )}
              </>
            );
          })()}
        </nav>
      )}
    </div>
  );
}
