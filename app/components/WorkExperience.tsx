import Section from './common/Section';
import Card from './common/Card';

export default function WorkExperience() {
  return (
    <Section id="work-experience" title="実務経験">
      <Card
        title="オフィスナビ株式会社"
        period="2023年12月 - 現在"
        description="物件検索サイトや社内サイトの開発に携わらせていただいています。"
        links={[
          { url: "https://www.office-navi.jp", label: "オフィスナビ" },
          { url: "https://www.rental-office-search.jp", label: "rental-office-search" }
        ]}
        tags={["Laravel", "React", "jQuery", "MySQL"]}
        className="work-item"
        headerClassName="work-header"
        bodyClassName="work-body"
        tagsClassName="work-tags"
        tagClassName="work-tag"
        linksClassName="work-links"
        linkClassName="work-link"
      />
    </Section>
  );
}
