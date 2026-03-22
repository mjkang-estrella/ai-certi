import { sidebarSections } from "../data/dashboard";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">AI</div>
        <div>
          <div className="brand-title">한국인공지능검증원 CMS</div>
          <div className="brand-sub">Client Management System</div>
        </div>
      </div>

      {sidebarSections.map((section) => (
        <nav className="menu-group" key={section.label} aria-label={section.label}>
          <div className="menu-label">{section.label}</div>
          <ul className="menu-list">
            {section.items.map((item) => (
              <li key={item.label}>
                <a
                  className={`menu-item${item.active ? " active" : ""}`}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}>
                      {item.badge}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </aside>
  );
}
