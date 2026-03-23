type TopbarProps = {
  title: string;
  description: string;
  showSearch: boolean;
  searchId: string;
  searchHelpText: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function Topbar({
  title,
  description,
  showSearch,
  searchId,
  searchHelpText,
  searchPlaceholder,
  searchValue,
  onSearchChange,
}: TopbarProps) {
  return (
    <div className="topbar">
      <div>
        <h1 className="page-title">{title}</h1>
        <p className="page-copy">{description}</p>
      </div>

      <div className="actions">
        {showSearch ? (
          <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor={searchId}>
              {searchPlaceholder}
            </label>
            <input
              className="search"
              id={searchId}
              name={searchId}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-describedby={`${searchId}-help`}
            />
            <span className="sr-only" id={`${searchId}-help`}>
              {searchHelpText}
            </span>
          </form>
        ) : null}
        <button type="button" className="button ghost">전화 접수 등록</button>
        <button type="button" className="button primary">의뢰서 수기 등록</button>
      </div>
    </div>
  );
}
