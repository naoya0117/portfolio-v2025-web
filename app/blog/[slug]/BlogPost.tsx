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


  if (loading) {
    return (
      <div className="container">
        <article className="post-full">
          <div className="post-full-header">
            <div className="h-6 bg-slate-200 rounded-lg w-20 mx-auto mb-4"></div>
            <div className="h-12 bg-slate-200 rounded-lg w-4/5 mx-auto mb-4"></div>
            <div className="h-6 bg-slate-200 rounded-lg w-32 mx-auto"></div>
          </div>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-200/50 p-12 text-center border border-white/20 mx-auto">
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
        <div className="post-full-header">
          <span className="post-full-category">{category}</span>
          <h1 
            className="post-full-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="post-full-meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>

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

    </div>
  );
}
