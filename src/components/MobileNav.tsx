import { Link, useLocation } from "react-router-dom";
import { getScopeFromSearchParams } from "../data/dashboard";
import { useDashboardData } from "./DashboardDataProvider";

function getCurrentRoute(pathname: string, search: string, hash: string) {
  if (pathname === "/projects" || pathname === "/companies") {
    const scope = getScopeFromSearchParams(new URLSearchParams(search));
    return `${pathname}?scope=${scope}${hash}`;
  }

  return `${pathname}${search}${hash}`;
}

export function MobileNav() {
  const { pathname, search, hash } = useLocation();
  const currentRoute = getCurrentRoute(pathname, search, hash);
  const { sidebarSections } = useDashboardData();
  const items = sidebarSections.flatMap((section) => section.items);

  return (
    <nav className="mobile-nav" aria-label="모바일 빠른 이동">
      <div className="mobile-nav-list">
        {items.map((item) => {
          const isActive = currentRoute === item.href;

          return (
            <Link
              className={`mobile-nav-item${isActive ? " active" : ""}`}
              to={item.href}
              key={`${item.label}-${item.href}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.mobileLabel ?? item.label}</span>
              {item.badge ? (
                <span
                  className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}
                  aria-label={item.badgeAriaLabel}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
