import Section from './common/Section';
import Card from './common/Card';

export default function PersonalProjects() {
  return (
    <Section id="personal-projects" title="個人開発・趣味">
      <div className="projects-grid">
        <Card
          title="vim-tetris"
          tags={["C", "Docker"]}
          description="vimのキーバインドやモードを搭載したtetrisです。vimの学習用アプリケーションとして作成し、jhlkでブロックのブロック操作や、:w, :q, ddを用いてブロックの削除を行います。1ヶ月の期間で作成し、授業内で2位の評価をいただきました。内部でマルチスレッドの排他制御等を行っています。"
          links={[
            { url: "https://github.com/naoya0117/vim-tetris", label: "GitHub", icon: "fab fa-github" }
          ]}
        />
      </div>
    </Section>
  );
}
