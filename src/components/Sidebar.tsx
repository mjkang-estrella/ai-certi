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
        <div className="menu-group" key={section.label}>
          <div className="menu-label">{section.label}</div>
          {section.items.map((item) => (
            <div className={`menu-item${item.active ? " active" : ""}`} key={item.label}>
              <span>{item.label}</span>
              {item.badge ? (
                <span className={`menu-pill${item.tone === "danger" ? " danger" : ""}`}>
                  {item.badge}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ))}

      <div className="sidebar-note">
        <h3>홈의 역할</h3>
        <p>
          관리자 홈은 전체 진행상황 관제와 시험원별 비교, 그리고 오늘 처리해야 할 리마인더를 한 화면에
          모으는 운영 대시보드로 둔다.
        </p>
      </div>
    </aside>
  );
}

