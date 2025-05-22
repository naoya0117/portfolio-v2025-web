'use client';

import { useCallback, useEffect } from 'react';

export const useSlideNavigation = () => {
  const updateActiveNavLink = useCallback((activeId: string) => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.classList.remove('nav-active');
    });
    
    const activeLink = document.querySelector(`nav a[href="#${activeId}"]`);
    if (activeLink) {
      activeLink.classList.add('nav-active');
    }
  }, []);

  const slideToSection = useCallback((targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // スムーズスクロールの設定
    const scrollOptions: ScrollToOptions = {
      top: targetElement.offsetTop - 80, // ヘッダーの高さを考慮
      behavior: 'smooth'
    };

    // スライドエフェクトを追加
    document.body.classList.add('slide-transition-active');
    
    // フェードアウト効果
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      (section as HTMLElement).classList.add('slide-transition');
    });

    // 遅延後にスクロールとフェードイン
    setTimeout(() => {
      window.scrollTo(scrollOptions);
      
      setTimeout(() => {
        sections.forEach((section) => {
          (section as HTMLElement).classList.remove('slide-transition');
        });
        
        document.body.classList.remove('slide-transition-active');
      }, 300);
    }, 200);

    // アクティブなナビゲーション項目の更新
    updateActiveNavLink(targetId);
  }, [updateActiveNavLink]);

  // スクロール位置に基づいてアクティブなナビゲーションを自動更新
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'background', 'skills', 'team-projects', 'personal-projects', 'work-experience', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100; // ヘッダーのオフセット

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          updateActiveNavLink(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期実行

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveNavLink]);

  return { slideToSection };
};
