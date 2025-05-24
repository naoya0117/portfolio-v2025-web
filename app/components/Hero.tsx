'use client';

import { useSlideNavigation } from '../hooks/useSlideNavigation';
import { getHeaderHeight } from './Header';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { slideToSection } = useSlideNavigation();
  const [headerHeight, setHeaderHeight] = useState(0);

  // ヘッダーの高さを取得して状態を更新
  useEffect(() => {
    // 初期値を設定
    setHeaderHeight(getHeaderHeight());

    // リサイズイベントでヘッダーの高さを再取得
    const handleResize = () => {
      setHeaderHeight(getHeaderHeight());
    };

    window.addEventListener('resize', handleResize);

    // 定期的にヘッダーの高さをチェック（ナビゲーションが折り返される可能性があるため）
    const intervalId = setInterval(() => {
      const currentHeight = getHeaderHeight();
      if (currentHeight !== headerHeight) {
        setHeaderHeight(currentHeight);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
    };
  }, [headerHeight]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    slideToSection(sectionId);
  };

  return (
    <section id="hero" style={{ marginTop: `${headerHeight}px` }}>
      <div className="container">
        <div className="hero-content">
          <h2>ご訪問ありがとうございます</h2>
          <p>エンジニアを目指してWeb開発、Linux、コンテナ技術を中心に学習中です</p>
          <div className="hero-buttons">
            <a 
              href="#contact" 
              className="btn primary"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              連絡する
            </a>
            <a 
              href="#skills" 
              className="btn secondary"
              onClick={(e) => handleNavClick(e, 'skills')}
            >
              スキルを見る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
