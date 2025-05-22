'use client';

import Link from 'next/link';
import { useSlideNavigation } from '../hooks/useSlideNavigation';

export default function Header() {
  const { slideToSection } = useSlideNavigation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    slideToSection(sectionId);
  };

  return (
    <header>
      <div className="container">
        <h1>Naoya&apos;s Portfolio</h1>
        <nav>
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
            <li className="nav-item-dropdown">
              <a 
                href="#blog" 
                onClick={(e) => handleNavClick(e, 'blog')}
                className="nav-link dropdown-trigger"
              >
                ブログ
                <i className="fas fa-chevron-down dropdown-icon"></i>
              </a>
              <div className="dropdown-menu">
                <Link href="/blog" className="dropdown-item">
                  <i className="fas fa-external-link-alt"></i>
                  ブログページ
                </Link>
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
    </header>
  );
}
