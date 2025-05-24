'use client';

import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { useHeaderHeight } from '../hooks/useHeaderHeight';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ヘッダーの高さを保持するグローバル変数
let currentHeaderHeight = 0;

// ヘッダーの高さを取得する関数
export function getHeaderHeight() {
  return currentHeaderHeight;
}

export default function Header() {
  const { slideToSection } = useSlideNavigation();
  const { headerRef, headerHeight } = useHeaderHeight();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const router = useRouter();

  // ヘッダーの高さが変わったらグローバル変数を更新
  useEffect(() => {
    currentHeaderHeight = headerHeight;
  }, [headerHeight]);

  // タッチデバイスの検出
  useEffect(() => {
    const detectTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    detectTouchDevice();
    window.addEventListener('touchstart', () => setIsTouchDevice(true), { once: true });
    return () => {
      window.removeEventListener('touchstart', () => setIsTouchDevice(true));
    };
  }, []);

  // アクティブタッチ状態をクリアする関数
  const clearActiveTouch = () => {
    if (dropdownRef.current) {
      const activeElements = dropdownRef.current.querySelectorAll('.active-touch');
      activeElements.forEach(element => {
        element.classList.remove('active-touch');
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'top') {
      // ページトップにスムーススクロール
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      slideToSection(sectionId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // ドロップダウンはhoverのみで操作するため、クリックイベントは不要

  // モバイルでのタッチアクティブ状態の管理とドロップダウン制御
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.nav-link') || 
                        target.closest('.dropdown-trigger') || 
                        target.closest('.dropdown-item') ||
                        target.closest('.portfolio-logo-link');

      if (navElement) {
        navElement.classList.add('active-touch');
      }

      // タッチデバイスでドロップダウン外をタッチした場合、ドロップダウンを閉じる
      if (isTouchDevice && isDropdownOpen) {
        const isClickInsideDropdown = dropdownRef.current?.contains(target as Node);
        if (!isClickInsideDropdown) {
          setIsDropdownOpen(false);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.nav-link') || 
                        target.closest('.dropdown-trigger') || 
                        target.closest('.dropdown-item') ||
                        target.closest('.portfolio-logo-link');

      if (navElement) {
        // 少し遅延させてアクティブ状態を解除
        setTimeout(() => {
          navElement.classList.remove('active-touch');
        }, 150);

        // タッチデバイスでドロップダウンアイテムをタッチした場合、ドロップダウンを閉じる
        if (isTouchDevice) {
          if (navElement.classList.contains('dropdown-item')) {
            setTimeout(() => {
              setIsDropdownOpen(false);
            }, 150);
          } else if (navElement.classList.contains('dropdown-trigger')) {
            // ドロップダウントリガーをタッチした場合は、ドロップダウンの状態を切り替える
            setTimeout(() => {
              setIsDropdownOpen(prev => !prev);
            }, 150);
          }
        }
      }
    };

    const handleTouchCancel = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const navElement = target.closest('.nav-link') || 
                        target.closest('.dropdown-trigger') || 
                        target.closest('.dropdown-item') ||
                        target.closest('.portfolio-logo-link');

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
  }, [isTouchDevice, isDropdownOpen]);

  return (
    <header ref={headerRef}>
      <div className="container">
        <div className="header-content">
          <div className="portfolio-brand">
            <a 
              href="#top" 
              onClick={(e) => handleNavClick(e, 'top')}
              className="portfolio-logo-link"
            >
              <span className="portfolio-logo">Naoya&apos;s</span>
              <span className="portfolio-title">Portfolio</span>
            </a>
          </div>
          <nav className="portfolio-nav">
          <ul>
            <li>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="nav-link"
              >
                自己紹介
              </a>
            </li>
            <li>
              <a 
                href="#background" 
                onClick={(e) => handleNavClick(e, 'background')}
                className="nav-link"
              >
                経歴
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => handleNavClick(e, 'skills')}
                className="nav-link"
              >
                技術経験
              </a>
            </li>
            <li>
              <a 
                href="#team-projects" 
                onClick={(e) => handleNavClick(e, 'team-projects')}
                className="nav-link"
              >
                チーム開発経験
              </a>
            </li>
            <li>
              <a 
                href="#personal-projects" 
                onClick={(e) => handleNavClick(e, 'personal-projects')}
                className="nav-link"
              >
                個人開発・趣味
              </a>
            </li>
            <li>
              <a 
                href="#work-experience" 
                onClick={(e) => handleNavClick(e, 'work-experience')}
                className="nav-link"
              >
                実務経験
              </a>
            </li>
            <li 
              className="nav-item-dropdown" 
              ref={dropdownRef}
              onMouseEnter={() => !isTouchDevice && setIsDropdownOpen(true)}
              onMouseLeave={() => {
                if (!isTouchDevice) {
                  setIsDropdownOpen(false);
                  clearActiveTouch();
                }
              }}
            >
              <span 
                className="nav-link dropdown-trigger"
                role="button"
              >
                ブログ
                <i className="fas fa-chevron-down dropdown-icon"></i>
              </span>
              <div className={`dropdown-menu ${isDropdownOpen ? 'dropdown-open' : ''}`}>
                <a 
                  href="#blog" 
                  onClick={(e) => handleNavClick(e, 'blog')}
                  onKeyDown={(e) => handleKeyDown(e, () => slideToSection('blog'))}
                  className="dropdown-item"
                >
                  <i className="fas fa-anchor"></i>
                  ブログセクション
                </a>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/blog');
                  }}
                  className="dropdown-item"
                >
                  <i className="fas fa-external-link-alt"></i>
                  ブログページ
                </a>
              </div>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="nav-link"
              >
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
