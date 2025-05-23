'use client';

import { useBlogPosts } from '../hooks/useBlogPosts';

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

export default function BlogPage() {
  const { posts, loading, error } = useBlogPosts();

  if (loading) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="blog-hero">
            <h1 className="blog-page-title">Tech Blog</h1>
            <p className="blog-page-subtitle">技術学習の記録と共有</p>
          </div>
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>記事を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';

    return (
      <div className="blog-page">
        <div className="container">
          <div className="blog-hero">
            <h1 className="blog-page-title">Tech Blog</h1>
            <p className="blog-page-subtitle">技術学習の記録と共有</p>
          </div>
          <div className="blog-error">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>記事の読み込みに失敗しました</h2>
            <p className="error-detail">
              WordPress サーバー ({wordpressUrl}) が起動しているか確認してください。
            </p>
            <p className="error-detail">
              エラー詳細: {error}
            </p>
            <button 
              className="btn primary retry-btn"
              onClick={() => window.location.reload()}
            >
              再試行
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="blog-hero">
            <h1 className="blog-page-title">Tech Blog</h1>
            <p className="blog-page-subtitle">技術学習の記録と共有</p>
          </div>
          <div className="blog-empty">
            <div className="empty-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <h2>記事がありません</h2>
            <p>まだ記事が投稿されていません。しばらくお待ちください。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-hero">
          <h1 className="blog-page-title">Tech Blog</h1>
          <p className="blog-page-subtitle">技術学習の記録と共有</p>
          <div className="blog-stats">
            <span className="post-count">{posts.length}件の記事</span>
          </div>
        </div>

        <div className="blog-posts">
          <div className="blog-posts-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-post-card">
                {post._embedded?.['wp:featuredmedia']?.[0] && (
                  <div className="blog-post-image">
                    <img 
                      src={post._embedded['wp:featuredmedia'][0].source_url} 
                      alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                      className="blog-post-thumbnail"
                    />
                  </div>
                )}
                <div className="blog-post-content">
                  <div className="blog-post-meta">
                    <time className="blog-post-date">
                      <i className="fas fa-calendar-alt"></i>
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="blog-post-title">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.title.rendered}
                    </a>
                  </h2>
                  <div className="blog-post-excerpt">
                    {stripHtml(post.excerpt.rendered).substring(0, 200)}
                    {stripHtml(post.excerpt.rendered).length > 200 ? '...' : ''}
                  </div>
                  <div className="blog-post-footer">
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="blog-read-more"
                    >
                      <span>続きを読む</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
