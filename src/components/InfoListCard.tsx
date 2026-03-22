import type { InfoItem } from "../data/dashboard";

type InfoListCardProps = {
  title: string;
  description: string;
  items: InfoItem[];
  variant: "timeline" | "schedule";
  subtle?: boolean;
};

export function InfoListCard({ title, description, items, variant, subtle = false }: InfoListCardProps) {
  return (
    <div className={`card${subtle ? " subtle-card" : ""}`}>
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{description}</p>
        </div>
      </div>
      <div className={variant}>
        {items.map((item) => (
          <div className={`${variant}-item`} key={item.title}>
            <strong>{item.title}</strong>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
