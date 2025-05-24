'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container">
      <main className="not-found-content">
        <div className="not-found-card">
          <div className="not-found-icon">
            <span className="not-found-emoji">🔍</span>
          </div>
          <h1 className="not-found-title">404</h1>
          <p className="not-found-subtitle">
            ブログページが見つかりませんでした
          </p>
          <p className="not-found-description">
            お探しのブログ記事は存在しないか、移動または削除された可能性があります。
          </p>
          <button
            onClick={() => router.push('/blog')}
            className="search-btn not-found-button"
          >
            <svg className="not-found-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ブログホームに戻る
          </button>
        </div>
      </main>
    </div>
  );
}