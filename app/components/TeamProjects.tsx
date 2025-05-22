import Section from './common/Section';
import Card from './common/Card';

export default function TeamProjects() {
  return (
    <Section id="team-projects" title="チーム開発経験">
      <div className="projects-grid">
        <Card
          title="MinecraftBotContest"
          tags={["Python"]}
          description="プログラミング初学者のための学内プログラミングコンテストの開発スタッフとして参加。キーボードをエミュレートし、C言語でマイクラのキャラを操作できる関数を作成。機能追加を3人チームで行った。"
          links={[
            { label: 'GitHub', url: 'https://github.com/masaki555/Minecraft_Contest', icon: 'fab fa-github' }
          ]}
        />
        <Card
          title="走れ!すすむくん!"
          tags={["React.js", "Express.js", "Phaser.js"]}
          description="学部3年時に大学の学祭に出展したブラウザベースの2Dアクションゲーム。ゼミ生10名で開発し、主にフロントエンド側のゲームのアルゴリズム部分を担当。担当した機能は、敵の当たり判定、敵の出現、プレイヤーのキーボード操作等。"
          links={[
            { label: 'デモを見る', url: 'https://susumukun.vercel.app/', icon: 'fas fa-external-link-alt' },
            { label: 'GitHub', url: 'https://github.com/Obanyan2023/susumukun', icon: 'fab fa-github' }
          ]}
        />
        <Card
          title="springboot-schedule-app"
          tags={["Java", "Spring Boot"]}
          description="学部3年の授業にて作成したユーザの予定を登録・削除・共有するためのカレンダーアプリ。4人チームで作成。授業内の評価で2位を獲得。"
          links={[
            { label: 'GitHub', url: 'https://github.com/naoya0117/springboot-schedule-app', icon: 'fab fa-github' }
          ]}
        />
        <Card
          title="関西オデッセイ"
          tags={["React"]}
          description="2023年の学生ハッカソンイベントKC3Hack2023に参加。「関西をええかんじに」をテーマとした観光スポットを回りながらポイントを獲得するスタンプラリー形式のゲームを6人チームで作成。デイジイエル賞を受賞。"
          links={[
            { label: 'GitHub', url: 'https://github.com/kc3hack/2024_L', icon: 'fab fa-github' }
          ]}
        />
      </div>
    </Section>
  );
}
