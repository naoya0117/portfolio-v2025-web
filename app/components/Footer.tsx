import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2025 Naoya - All Rights Reserved</p>
        <div className="social-links">
          <Link href="https://github.com/naoya0117" target="_blank" rel="noopener noreferrer" title="GitHub（個人用）"><i className="fab fa-github"></i></Link>
          <Link href="https://github.com/n-matsuhashi" target="_blank" rel="noopener noreferrer" title="GitHub（仕事用）"><i className="fab fa-github"></i></Link>
          <Link href="mailto:naoya.portfolio@gmail.com" title="Email"><i className="fas fa-envelope"></i></Link>
        </div>
      </div>
    </footer>
  );
}