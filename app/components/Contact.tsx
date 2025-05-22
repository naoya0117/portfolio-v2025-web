import Link from 'next/link';
import Section from './common/Section';

export default function Contact() {
  return (
    <Section id="contact" title="連絡先">
      <div className="contact-content">
        <p>以下の方法でご連絡いただけます。お気軽にお問い合わせください。</p>
        <div className="contact-methods">
          <div className="contact-method">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <a href="mailto:naoya.portfolio@gmail.com">naoya.portfolio@gmail.com</a>
          </div>
          <div className="contact-method">
            <i className="fab fa-github"></i>
            <h3>GitHub（個人用）</h3>
            <Link href="https://github.com/naoya0117" target="_blank" rel="noopener noreferrer">github.com/naoya0117</Link>
          </div>
          <div className="contact-method">
            <i className="fab fa-github"></i>
            <h3>GitHub（仕事用）</h3>
            <Link href="https://github.com/n-matsuhashi" target="_blank" rel="noopener noreferrer">github.com/n-matsuhashi</Link>
          </div>
        </div>
        <div className="contact-form">
          <h3>お問い合わせフォーム</h3>
          <form id="contactForm">
            <div className="form-group">
              <label htmlFor="name">お名前</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">メッセージ</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn primary">送信</button>
          </form>
        </div>
      </div>
    </Section>
  );
}
