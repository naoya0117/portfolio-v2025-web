import Section from './common/Section';

export default function Background() {
  return (
    <Section id="background" title="経歴">
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">2003年1月</div>
          <div className="timeline-content">
            <h3>誕生</h3>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">2021年3月</div>
          <div className="timeline-content">
            <h3>静岡の普通科高校卒業</h3>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">2021年4月</div>
          <div className="timeline-content">
            <h3>大阪の情報系の大学に入学</h3>
            <p>初めてPCに触る。学部では、プログラミングやソフトウェア工学の基礎を学ぶ。</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">2025年3月</div>
          <div className="timeline-content">
            <h3>大学を卒業</h3>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">2025年4月</div>
          <div className="timeline-content">
            <h3>同大学の修士課程に進学</h3>
            <p>現在に至る</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
