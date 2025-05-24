'use client';

import Link from 'next/link';

export default function BlogFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-section">
            <h3 className="footer-title">Naoya&apos;s Blog</h3>
            <p className="footer-description">
              一人のWebエンジニアの技術探求、学習の軌跡、そして時々の考察を記録するブログです。日々の学びが誰かの助けになれば幸いです。
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">カテゴリ</h4>
            <ul className="footer-links-list">
              <li><Link href="/blog?category=tech" className="footer-link">技術記事</Link></li>
              <li><Link href="/blog?category=learning" className="footer-link">学習記録</Link></li>
              <li><Link href="/blog?category=project" className="footer-link">プロジェクト</Link></li>
              <li><Link href="/blog?category=poem" className="footer-link">ポエム</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">サイトマップ</h4>
            <ul className="footer-links-list">
              <li><Link href="/blog" className="footer-link">ホーム</Link></li>
              <li><Link href="/about" className="footer-link">について</Link></li>
              <li><Link href="/" className="footer-link">ポートフォリオ</Link></li>
              <li><Link href="/privacy-policy" className="footer-link">プライバシーポリシー</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">連絡先</h4>
            <ul className="footer-links-list">
              <li><a href="mailto:naoya.portfolio@gmail.com" className="footer-link">Email</a></li>
              <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></li>
              <li><a href="https://github.com/naoya0117" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://twitter.com/" className="footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.15 2.33,6.94C2.33,8.43 3.1,9.75 4.18,10.53C3.46,10.5 2.8,10.32 2.2,10.03C2.2,10.05 2.2,10.07 2.2,10.08C2.2,12.24 3.73,14.04 5.7,14.44C5.35,14.53 4.98,14.58 4.59,14.58C4.31,14.58 4.03,14.56 3.76,14.51C4.31,16.28 5.96,17.54 7.9,17.58C6.38,18.78 4.43,19.5 2.29,19.5C1.94,19.5 1.6,19.48 1.25,19.43C3.25,20.78 5.6,21.5 8.12,21.5C16,21.5 20.33,14.81 20.33,8.87C20.33,8.67 20.33,8.47 20.32,8.28C21.17,7.67 21.89,6.89 22.46,6Z"></path></svg>
            </a>
            <a href="https://github.com/naoya0117" className="footer-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.73C9.63,17.1 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
            </a>
          </div>
          <div className="footer-legal">
            <div className="footer-links">
              <Link href="/terms" className="footer-link">利用規約</Link>
              <Link href="/privacy-policy" className="footer-link">プライバシーポリシー</Link>
            </div>
            <p className="footer-copyright">&copy; 2025 Naoya&apos;s Blog. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}