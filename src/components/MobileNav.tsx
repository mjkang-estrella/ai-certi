import { Link, useLocation } from "react-router-dom";
import { sidebarSections } from "../data/dashboard";

export function MobileNav() {
  const { pathname } = useLocation();
  const items = sidebarSections.flatMap((section) => section.items);

  return (
    <nav className="mobile-nav" aria-label="모바일 빠른 이동">
      <div className="mobile-nav-list">
        {items.map((item) => {
          const isActive = !item.href.includes("#") && pathname === item.href;

          return (
            <Link
              className={`mobile-nav-item${isActive ? " active" : ""}`}
              to={item.href}
              key={`${item.label}-${item.href}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
              {item.badge ? (
                <span className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}>{item.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
