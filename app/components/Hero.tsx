'use client';

import { useSlideNavigation } from '../hooks/useSlideNavigation';

export default function Hero() {
  const { slideToSection } = useSlideNavigation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    slideToSection(sectionId);
  };

  return (
    <section id="hero">
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