import Section from './common/Section';

export default function Skills() {
  return (
    <Section id="skills" title="技術経験">
      <div className="skills-content">
        <div className="skill-category">
          <h3>主要スキル</h3>
          <div className="main-skills-grid">
            <div className="main-skill-card">
              <h4>Linux</h4>
              <p>学部1年生の冬からシェルに興味を持ち自分のメインPCにインスト−ル。開発環境やデスクトップ環境をいじりながら、シェル操作や設定ファイルの基礎を学んだ。ArchLinuxを愛用している。</p>
            </div>
            <div className="main-skill-card">
              <h4>Docker</h4>
              <p>学部3年時にweb開発を始めたことがきっかけで入門。いろんな場面で広く利用しており、学部4年時はDockerをテーマとした卒業研究に取り組んだ。</p>
            </div>
            <div className="main-skill-card">
              <h4>Nginx</h4>
              <p>webアプリを公開する際のwebサーバとして利用。また、保有するVPS上で複数のアプリケーションを公開するためのリバースプロキシにも利用。</p>
            </div>
            <div className="main-skill-card">
              <h4>Kubernetes</h4>
              <p>修士1年の春から入門。OSS(Helm Chart)や自作アプリケーションのデプロイを行った。ディストリビューションはk3s。修論テーマとして検討中。</p>
            </div>
            <div className="main-skill-card">
              <h4>React (Javascript, Typescript)</h4>
              <p>学部3年生時にweb開発を始めたことがきっかけで入門。静的アプリの開発を学んだ。</p>
            </div>
            <div className="main-skill-card">
              <h4>Laravel (PHP)</h4>
              <p>学部3年生の冬から今に至るまでインターンシップ先の業務にて利用。MVCモデルやバックエンドの基礎を学んだ。</p>
            </div>
            <div className="main-skill-card">
              <h4>MySQL</h4>
              <p>web開発で広く利用。SQL操作やトランザクションについて学習。</p>
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="skill-category other-skills">
            <h3>その他のスキル</h3>
            <div className="other-skills-section">
              <div className="skill-group">
                <h4>授業や研究でそれなりに利用</h4>
                <div className="skill-tags">
                  <span className="skill-tag">C</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">Spring Boot</span>
                  <span className="skill-tag">FastAPI</span>
                  <span className="skill-tag">PostgreSQL</span>
                </div>
              </div>
              <div className="skill-group">
                <h4>学習中・興味のある技術</h4>
                <div className="skill-tags learning">
                  <span className="skill-tag">Go</span>
                  <span className="skill-tag">Web Assembly</span>
                </div>
              </div>
            </div>
          </div>
          <div className="skill-category github-stats">
            <h3>GitHub統計</h3>
            <div className="github-stats-section">
              <div className="github-stat-group">
                <h4>利用言語</h4>
                <div className="github-stats-card">
                  <img 
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=naoya0117&layout=compact&theme=default&hide_border=true&card_width=400&langs_count=10"
                    alt="Top Languages"
                    className="github-stats-image"
                  />
                </div>
                <div className="github-stats-credit">
                  Powered by <a href="https://github.com/anuraghazra/github-readme-stats" target="_blank" rel="noopener noreferrer">GitHub Readme Stats</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
