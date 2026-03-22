import type { SummaryItem } from "../data/dashboard";

type SummaryListCardProps = {
  title: string;
  description: string;
  items: SummaryItem[];
};

export function SummaryListCard({ title, description, items }: SummaryListCardProps) {
  return (
    <div className="card">
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{description}</p>
        </div>
      </div>

      <div className="summary-list">
        {items.map((item) => (
          <div className="summary-item" key={item.title}>
            <div>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
            <div className="summary-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

