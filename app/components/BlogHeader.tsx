'use client';

import Link from 'next/link';

export default function BlogHeader() {
  return (
    <header className="blog-header">
      <div className="container">
        <div className="blog-header-content">
          <div className="blog-brand">
            <Link href="/" className="blog-home-link">
              <span className="blog-logo">Naoya&#39;s</span>
              <span className="blog-title">Tech Blog</span>
            </Link>
          </div>
          <nav className="blog-nav">
            <ul>
              <li>
                <Link href="/" className="blog-nav-link">
                  <i className="fas fa-home"></i>
                  ポートフォリオ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="blog-nav-link active">
                  <i className="fas fa-blog"></i>
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="blog-nav-link">
                  <i className="fas fa-envelope"></i>
                  連絡先
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
