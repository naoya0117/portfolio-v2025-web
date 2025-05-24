'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogHeader() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const menuButton = document.querySelector('.menu-toggle');

      if (menu && !menu.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if we're on the blog page
  const isBlogPage = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === '/blog' || window.location.pathname === '/blog/';
    }
    return false;
  };

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

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a 
                href="#" 
                className="nav-link active"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/blog');
                  setIsMenuOpen(false);
                }}
              >
                ホーム
              </a>
            </li>
            <li>
              <Link 
                href="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
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
