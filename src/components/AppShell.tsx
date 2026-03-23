import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type HeaderConfig = {
  title: string;
  description: string;
  showSearch: boolean;
};

export type AppShellOutletContext = {
  companySearch: string;
  setCompanySearch: (value: string) => void;
};

const dashboardHeader: HeaderConfig = {
  title: "운영 현황",
  description: "이 달 진행상황과 시험원별 단계 분포 확인",
  showSearch: true,
};

const companiesHeader: HeaderConfig = {
  title: "기업 목록",
  description: "기업 기본 정보와 관련 프로젝트를 함께 조회",
  showSearch: false,
};

export function AppShell() {
  const location = useLocation();
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");

  const isCompaniesRoute = location.pathname.startsWith("/companies");
  const header = isCompaniesRoute ? companiesHeader : dashboardHeader;
  const searchValue = isCompaniesRoute ? companySearch : dashboardSearch;
  const setSearchValue = isCompaniesRoute ? setCompanySearch : setDashboardSearch;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main" aria-label={`${header.title} 본문`}>
        <div className="container">
          <Topbar
            title={header.title}
            description={header.description}
            showSearch={header.showSearch}
            searchId="dashboard-search"
            searchHelpText="프로젝트명, 담당자명 또는 기업명으로 현재 진행 건을 검색합니다."
            searchPlaceholder="기업명, 담당자, 프로젝트 검색"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          <MobileNav />
          <Outlet context={{ companySearch, setCompanySearch }} />
        </div>
      </main>
    </div>
  );
}
