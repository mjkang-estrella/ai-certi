type ProjectSectionNavProps = {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onJump: (sectionId: string) => void;
};

export function ProjectSectionNav({ sections, activeSection, onJump }: ProjectSectionNavProps) {
  return (
    <aside className="card project-section-nav" aria-label="프로젝트 상세 섹션 이동">
      <div className="project-section-nav-inner">
        <p className="project-section-nav-label">섹션 이동</p>
        <div className="project-section-nav-list">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`project-section-nav-item${activeSection === section.id ? " active" : ""}`}
              onClick={() => onJump(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
