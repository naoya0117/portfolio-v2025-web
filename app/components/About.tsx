import Section from './common/Section';

export default function About() {
  return (
    <Section id="about" title="自己紹介">
      <div className="about-content">
        <div className="about-text">
          <p>このたびはご訪問いただきありがとうございます。</p>
          <p>私は、情報科学系の大学院に在籍しているnaoyaと申します。エンジニアを志しており、インターンシップで業務の経験を積みながら、web開発やLinuxの勉強をしております。</p>
          <p>このページを通して、エンジニアの先輩方とのつながりが少しでもできたらうれしいです。</p>
        </div>
      </div>
    </Section>
  );
}
