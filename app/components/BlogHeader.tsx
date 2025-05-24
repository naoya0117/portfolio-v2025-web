'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogHeader() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on the blog page
  const isBlogPage = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/blog' || window.location.pathname === '/blog/';
    }
    return false;
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <header className="header">
      <div className="nav-container">
        <a href="#" className="logo" onClick={(e) => {
          e.preventDefault();
          if (isBlogPage()) {
            // If already on blog page, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // Otherwise navigate to blog page
            router.push('/blog');
          }
        }}>
          <span className="logo-main">Naoya&apos;s</span>
          <span className="logo-sub">Blog</span>
        </a>

        <nav>
          <ul className="nav-menu active">
            {/* Only show home button on non-mobile devices */}
            {!isMobile && (
              <li>
                <a 
                  href="#" 
                  className="nav-link active"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/blog');
                  }}
                >
                  ホーム
                </a>
              </li>
            )}
            <li>
              <Link 
                href="/" 
                className="nav-link"
              >
                ポートフォリオ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
