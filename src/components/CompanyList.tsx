import type { ClientListItem } from "../data/dashboard";

type CompanyListProps = {
  items: ClientListItem[];
  selectedClientId: string;
  onSelect: (clientId: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function CompanyList({
  items,
  selectedClientId,
  onSelect,
  searchValue,
  onSearchChange,
}: CompanyListProps) {
  return (
    <section className="card company-list-card">
      <div className="section-head">
        <div>
          <h2 className="section-title">기업 목록</h2>
          <p className="section-copy">검색 결과 {items.length}개 기업</p>
        </div>
        <form className="company-list-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="company-list-search">
            기업명, 담당자, 이메일 검색
          </label>
          <input
            className="search search-compact"
            id="company-list-search"
            name="company-list-search"
            placeholder="기업 검색"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </form>
      </div>

      {items.length === 0 ? (
        <div className="company-empty-state">검색 결과가 없습니다. 기업명, 담당자명, 이메일을 다시 확인해 주세요.</div>
      ) : (
        <ul className="company-list" aria-label="기업 목록">
          {items.map((item) => {
            const isSelected = item.client.id === selectedClientId;

            return (
              <li key={item.client.id}>
                <button
                  type="button"
                  className={`company-list-item${isSelected ? " selected" : ""}`}
                  onClick={() => onSelect(item.client.id)}
                >
                  <div className="company-list-head">
                    <div>
                      <div className="company-name">{item.client.companyName}</div>
                      <div className="company-sub">
                        담당 {item.client.contactName} · {item.client.phone || item.client.email}
                      </div>
                    </div>
                    <div className="company-list-updated">{item.latestProjectAt}</div>
                  </div>

                  <div className="company-list-meta">
                    <span>진행중 {item.activeProjectCount}건</span>
                    <span>전체 {item.projectCount}건</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
