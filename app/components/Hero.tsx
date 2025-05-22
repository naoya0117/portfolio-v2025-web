import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <h2>ご訪問ありがとうございます</h2>
          <p>エンジニアを目指してWeb開発、Linux、コンテナ技術を中心に学習中です</p>
          <div className="hero-buttons">
            <Link href="#contact" className="btn primary">連絡する</Link>
            <Link href="#skills" className="btn secondary">スキルを見る</Link>
          </div>
        </div>
      </div>
    </section>
  );
}