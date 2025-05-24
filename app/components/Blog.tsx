'use client';

import Image from 'next/image';
import Section from './common/Section';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useRouter } from 'next/navigation';

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

export default function Blog() {
  const { posts, loading, error } = useBlogPosts();
  const router = useRouter();

  if (loading) {
    return (
      <Section id="blog" title="ブログの更新記事">
        <div className="blog-content">
          <div className="blog-loading">
            <p>記事を読み込み中...</p>
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';

    return (
      <Section id="blog" title="ブログの更新記事">
        <div className="blog-content">
          <div className="blog-error">
            <p>記事の読み込みに失敗しました。</p>
            <p className="error-detail">
              WordPress サーバー ({wordpressUrl}) が起動しているか確認してください。
            </p>
            <p className="error-detail">
              エラー詳細: {error}
            </p>
          </div>
        </div>
      </Section>
    );
  }

  if (posts.length === 0) {
    return (
      <Section id="blog" title="ブログの更新記事">
        <div className="blog-content">
          <div className="blog-empty">
            <p>記事が見つかりませんでした。</p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="blog" title="ブログの更新記事">
      <div className="blog-content">
        <div className="view-all-posts">
          <button 
            className="view-all-button"
            onClick={() => router.push('/blog')}
          >
            <span>すべての記事を見る</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="blog-card"
              onClick={() => router.push(`/blog/${post.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              {post._embedded?.['wp:featuredmedia']?.[0] && (
                <div className="blog-image">
                  <Image 
                    src={post._embedded['wp:featuredmedia'][0].source_url} 
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                    width={400}
                    height={225}
                    className="blog-thumbnail"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  <time className="blog-date">{formatDate(post.date)}</time>
                </div>
                <h3 className="blog-title">
                  <span
                    className="text-left w-full hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h3>
                <div className="blog-excerpt">
                  {stripHtml(post.excerpt.rendered).substring(0, 150)}
                  {stripHtml(post.excerpt.rendered).length > 150 ? '...' : ''}
                </div>
                <div className="blog-link">
                  <span className="read-more">
                    続きを読む
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
