import { sidebarSections } from "../data/dashboard";

export function MobileNav() {
  const items = sidebarSections.flatMap((section) => section.items);

  return (
    <nav className="mobile-nav" aria-label="모바일 빠른 이동">
      <div className="mobile-nav-list">
        {items.map((item) => (
          <a
            className={`mobile-nav-item${item.active ? " active" : ""}`}
            href={item.href}
            key={`${item.label}-${item.href}`}
            aria-current={item.active ? "page" : undefined}
          >
            <span>{item.label}</span>
            {item.badge ? (
              <span className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}>{item.badge}</span>
            ) : null}
          </a>
        ))}
      </div>
    </nav>
  );
}

