'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogHeader() {
  const router = useRouter();
  // モバイルでのタッチアクティブ状態の管理
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.blog-nav-link') || target.closest('.blog-home-link');

      if (navElement) {
        navElement.classList.add('active-touch');
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.blog-nav-link') || target.closest('.blog-home-link');

      if (navElement) {
        // 少し遅延させてアクティブ状態を解除
        setTimeout(() => {
          navElement.classList.remove('active-touch');
        }, 150);
      }
    };

    const handleTouchCancel = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.blog-nav-link') || target.closest('.blog-home-link');

      if (navElement) {
        navElement.classList.remove('active-touch');
      }
    };

    // タッチイベントリスナーを追加
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, []);

  return (
    <header className="blog-header">
      <div className="container">
        <div className="blog-header-content">
          <div className="blog-brand">
            <a 
              href="#top" 
              onClick={(e) => {
                e.preventDefault();
                // ページトップにスムーススクロール
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="blog-home-link"
            >
              <span className="blog-logo">Naoya&#39;s</span>
              <span className="blog-title">Tech Blog</span>
            </a>
          </div>
          <nav className="blog-nav">
            <ul>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/blog');
                  }}
                  className="blog-nav-link active"
                >
                  <i className="fas fa-blog"></i>
                  記事一覧
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                  }}
                  className="blog-nav-link"
                >
                  <i className="fas fa-user-circle"></i>
                  ポートフォリオ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/#contact');
                  }}
                  className="blog-nav-link"
                >
                  <i className="fas fa-envelope"></i>
                  連絡先
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
