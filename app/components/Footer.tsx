'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-section">
            <h3 className="footer-title">Naoya&apos;s Portfolio</h3>
            <p className="footer-description">
              Webエンジニアとしての技術と経験を紹介するポートフォリオサイトです。プロジェクト、スキル、そして私の成長の軌跡をご覧ください。
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">サイトマップ</h4>
            <ul className="footer-links-list">
              <li><Link href="/" className="footer-link">ホーム</Link></li>
              <li><Link href="/blog" className="footer-link">ブログ</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">連絡先</h4>
            <ul className="footer-links-list">
              <li><a href="mailto:naoya.portfolio@gmail.com" className="footer-link">Email</a></li>
              <li><a href="https://github.com/naoya0117" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub（個人用）</a></li>
              <li><a href="https://github.com/n-matsuhashi" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub（仕事用）</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://github.com/naoya0117" className="footer-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.73C9.63,17.1 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
              </svg>
            </a>
          </div>
          <div className="footer-legal">
            <p className="footer-copyright">&copy; 2025 Naoya. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
