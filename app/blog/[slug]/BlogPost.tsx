'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 型定義
interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:term'?: Array<Array<{
      id: number;
      count: number;
      description: string;
      link: string;
      name: string;
      slug: string;
      taxonomy: string;
      parent: number;
    }>>;
    'wp:featuredmedia'?: Array<{
      id: number;
      date: string;
      slug: string;
      type: string;
      link: string;
      title: {
        rendered: string;
      };
      author: number;
      caption: {
        rendered: string;
      };
      alt_text: string;
      media_type: string;
      mime_type: string;
      media_details: {
        width: number;
        height: number;
        file: string;
        image_meta: Record<string, unknown>;
        sizes: Record<string, unknown>;
      };
      source_url: string;
    }>;
  };
}

interface RelatedPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
    }>>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Used in related posts excerpt
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

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const router = useRouter();

  const [post, setPost] = useState<WordPressPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';

        // 記事詳細を取得
        const postResponse = await fetch(
          `${apiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed=true`
        );

        if (!postResponse.ok) {
          throw new Error(`記事の取得に失敗しました: ${postResponse.status}`);
        }

        const posts = await postResponse.json();

        if (posts.length === 0) {
          throw new Error('記事が見つかりませんでした');
        }

        const currentPost = posts[0];
        setPost(currentPost);

        // 関連記事を取得（同じカテゴリの記事を2件）
        if (currentPost.categories && currentPost.categories.length > 0) {
          const relatedResponse = await fetch(
            `${apiUrl}/wp-json/wp/v2/posts?categories=${currentPost.categories[0]}&exclude=${currentPost.id}&per_page=2&_embed=true`
          );

          if (relatedResponse.ok) {
            const related = await relatedResponse.json();
            setRelatedPosts(related);
          }
        }

        // ハイライト適用（記事読み込み後）
        setTimeout(() => {
          // @ts-expect-error hljs is loaded via CDN
          if (typeof window !== 'undefined' && window.hljs) {
            // @ts-expect-error hljs is loaded via CDN
            window.hljs.highlightAll();
          }
        }, 100);

      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // 共有機能
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title.rendered || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnHatena = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title.rendered || '');
    window.open(`https://b.hatena.ne.jp/entry/panel/?url=${url}&title=${title}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (loading) {
    return (
      <div className="container">
        <article className="post-full">
          <header className="post-full-header">
            <div className="h-6 bg-slate-200 rounded-lg w-20 mx-auto mb-4"></div>
            <div className="h-12 bg-slate-200 rounded-lg w-4/5 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-32 mx-auto"></div>
          </header>
          <section className="post-content">
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
              <div className="h-4 bg-slate-200 rounded w-3/5"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </section>
        </article>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-200/50 p-12 text-center border border-white/20 max-w-4xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">記事の読み込みに失敗しました</h2>
          <p className="text-slate-600 mb-8 text-lg">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              className="search-btn"
              onClick={() => window.location.reload()}
            >
              再試行
            </button>
            <button 
              className="page-btn"
              onClick={() => router.push('/blog')}
            >
              ブログ一覧に戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // カテゴリ名を取得
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'その他';
  const tags = post._embedded?.['wp:term']?.[1] || [];

  return (
    <div className="container post-container">
      <article className="post-full">
        <header className="post-full-header">
          <span className="post-full-category">{category}</span>
          <h1 
            className="post-full-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="post-full-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        <section 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <footer className="post-full-footer">
          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map(tag => (
                <a key={tag.id} href="#" className="post-tag">{tag.name}</a>
              ))}
            </div>
          )}
          <div className="share-section">
            <h4>この記事をシェアする</h4>
            <div className="share-links">
              <button 
                onClick={shareOnTwitter}
                className="share-link twitter" 
                aria-label="Twitterでシェア"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.15 2.33,6.94C2.33,8.43 3.1,9.75 4.18,10.53C3.46,10.5 2.8,10.32 2.2,10.03C2.2,10.05 2.2,10.07 2.2,10.08C2.2,12.24 3.73,14.04 5.7,14.44C5.35,14.53 4.98,14.58 4.59,14.58C4.31,14.58 4.03,14.56 3.76,14.51C4.31,16.28 5.96,17.54 7.9,17.58C6.38,18.78 4.43,19.5 2.29,19.5C1.94,19.5 1.6,19.48 1.25,19.43C3.25,20.78 5.6,21.5 8.12,21.5C16,21.5 20.33,14.81 20.33,8.87C20.33,8.67 20.33,8.47 20.32,8.28C21.17,7.67 21.89,6.89 22.46,6Z"></path>
                </svg>
              </button>
              <button 
                onClick={shareOnFacebook}
                className="share-link facebook" 
                aria-label="Facebookでシェア"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18,3.5H15C12.92,3.5 12,4.64 12,6.7V9H9V12H12V19H15V12H18L18.5,9H15V7.1C15,6.5 15.14,6 16,6H18V3.5Z"></path>
                </svg>
              </button>
              <button 
                onClick={shareOnHatena}
                className="share-link hatena" 
                aria-label="はてなブックマークでシェア"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.13,8.25C19.13,7 18.2,6 16.89,6H7.11C5.8,6 4.88,7 4.88,8.25V14.5C4.88,15.75 5.8,16.75 7.11,16.75H8.63V20L12,16.75H16.89C18.2,16.75 19.13,15.75 19.13,14.5V8.25M10.25,13.25H8.75V10.75H10.25V13.25M15.25,13.25H13.75V10.75H15.25V13.25Z"></path>
                </svg>
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="share-link linkedin" 
                aria-label="LinkedInでシェア"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </article>

      {relatedPosts.length > 0 && (
        <section className="related-posts">
          <div className="container">
            <h3 className="related-posts-title">関連記事</h3>
          </div>
          <div className="related-grid">
            {relatedPosts.map((relatedPost) => {
              const relatedCategory = relatedPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'その他';
              const emoji = getCategoryEmoji(relatedCategory);

              return (
                <article 
                  key={relatedPost.id} 
                  className="article-card" 
                  tabIndex={0}
                  onClick={() => router.push(`/blog/${relatedPost.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="article-image">
                    {relatedPost._embedded?.['wp:featuredmedia']?.[0] ? (
                      <Image 
                        src={relatedPost._embedded['wp:featuredmedia'][0].source_url} 
                        alt={relatedPost._embedded['wp:featuredmedia'][0].alt_text || relatedPost.title.rendered}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <span className="article-emoji">{emoji}</span>
                    )}
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <time className="article-date" dateTime={relatedPost.date}>
                        {formatDate(relatedPost.date)}
                      </time>
                      <span className="article-category">{relatedCategory}</span>
                    </div>
                    <h2 
                      className="article-title"
                      dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                    />
                    {relatedPost.excerpt && (
                      <p className="article-excerpt">
                        {stripHtml(relatedPost.excerpt.rendered).substring(0, 100)}
                        {stripHtml(relatedPost.excerpt.rendered).length > 100 ? '...' : ''}
                      </p>
                    )}
                    <button className="read-more">続きを読む</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <div className="post-navigation">
        <button 
          className="page-btn"
          onClick={() => router.push('/blog')}
        >
          ← ブログ一覧に戻る
        </button>
      </div>
    </div>
  );
}
