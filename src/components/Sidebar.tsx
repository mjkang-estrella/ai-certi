import { useEffect, useState } from "react";
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

export function Sidebar() {
  const { pathname, search, hash } = useLocation();
  const currentRoute = getCurrentRoute(pathname, search, hash);
  const { sidebarSections } = useDashboardData();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    진행중: false,
    완료: true,
  });

  useEffect(() => {
    const hasActiveCompletedItem = sidebarSections
      .find((section) => section.label === "완료")
      ?.items.some((item) => item.href === currentRoute);

    if (hasActiveCompletedItem) {
      setCollapsedSections((current) => (current.완료 ? { ...current, 완료: false } : current));
    }
  }, [currentRoute, sidebarSections]);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">AI</div>
        <div>
          <div className="brand-title">KAIC CMS</div>
          <div className="brand-sub">Client Management System</div>
        </div>
      </div>

      {sidebarSections.map((section) => (
        <nav className="menu-group" key={section.label} aria-label={section.label}>
          <button
            type="button"
            className="menu-label menu-label-button"
            onClick={() =>
              setCollapsedSections((current) => ({
                ...current,
                [section.label]: !current[section.label],
              }))
            }
            aria-expanded={!collapsedSections[section.label]}
          >
            <span>{section.label}</span>
            <span className={`menu-label-chevron${collapsedSections[section.label] ? "" : " expanded"}`} aria-hidden="true">
              ▾
            </span>
          </button>
          <ul className={`menu-list${collapsedSections[section.label] ? " collapsed" : ""}`}>
            {section.items.map((item) => {
              const isActive = currentRoute === item.href;

              return (
                <li key={item.label}>
                  <Link
                    className={`menu-item${isActive ? " active" : ""}`}
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span
                        className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}
                        aria-label={item.badgeAriaLabel}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ))}
    </aside>
  );
}
