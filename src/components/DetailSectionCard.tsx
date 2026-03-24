import type { ReactNode } from "react";

type DetailSectionCardProps = {
  id: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DetailSectionCard({ id, title, description, actions, children, className }: DetailSectionCardProps) {
  return (
    <section className={`card detail-section-card${className ? ` ${className}` : ""}`} id={id}>
      <div className="section-head detail-section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{description}</p>
        </div>
        {actions ? <div className="detail-section-actions">{actions}</div> : null}
      </div>
      <div className="detail-section-body">{children}</div>
    </section>
  );
}
