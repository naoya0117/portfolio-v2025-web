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
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                router.push('/');
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
                    // 新しいタブでWordPressの管理画面を開く
                    window.open(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/wp-json/wp/v2', '')}/wp-admin`, '_blank');
                  }}
                  className="blog-nav-link blog-admin-link"
                >
                  <i className="fas fa-edit"></i>
                  記事を書く
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
