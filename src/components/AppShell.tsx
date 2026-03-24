import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type HeaderConfig = {
  title: string;
  description: string;
  showSearch: boolean;
  searchId: string;
  searchHelpText: string;
  searchPlaceholder: string;
};

export type AppShellOutletContext = {
  companySearch: string;
  setCompanySearch: (value: string) => void;
  projectSearch: string;
  setProjectSearch: (value: string) => void;
};

const dashboardHeader: HeaderConfig = {
  title: "운영 현황",
  description: "이 달 진행상황과 시험원별 단계 분포 확인",
  showSearch: true,
  searchId: "dashboard-search",
  searchHelpText: "프로젝트명, 담당자명 또는 기업명으로 현재 진행 건을 검색합니다.",
  searchPlaceholder: "기업명, 담당자, 프로젝트 검색",
};

const companiesHeader: HeaderConfig = {
  title: "기업 목록",
  description: "기업 기본 정보와 관련 프로젝트를 함께 조회",
  showSearch: false,
  searchId: "company-search",
  searchHelpText: "기업 목록 검색은 페이지 내부에서 제공합니다.",
  searchPlaceholder: "기업 검색",
};

const projectsHeader: HeaderConfig = {
  title: "프로젝트 관리",
  description: "전체 프로젝트를 상태와 담당자 기준으로 빠르게 좁혀 보고 운영 우선순위를 정리합니다.",
  showSearch: true,
  searchId: "project-search",
  searchHelpText: "기업명, 프로젝트명 또는 담당자명으로 프로젝트를 검색합니다.",
  searchPlaceholder: "기업명, 담당자, 프로젝트 검색",
};

const projectDetailHeader: HeaderConfig = {
  title: "프로젝트 상세",
  description: "현재 상태와 다음 액션, 운영 기록을 한 화면에서 확인합니다.",
  showSearch: false,
  searchId: "project-detail-search",
  searchHelpText: "프로젝트 상세 화면에서는 검색을 사용하지 않습니다.",
  searchPlaceholder: "검색 사용 안 함",
};

export function AppShell() {
  const location = useLocation();
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");

  const isCompaniesRoute = location.pathname.startsWith("/companies");
  const isProjectDetailRoute = /^\/projects\/[^/]+$/.test(location.pathname);
  const isProjectsRoute = location.pathname.startsWith("/projects");

  const header = isCompaniesRoute
    ? companiesHeader
    : isProjectDetailRoute
      ? projectDetailHeader
      : isProjectsRoute
        ? projectsHeader
        : dashboardHeader;
  const searchValue = isProjectsRoute ? projectSearch : isCompaniesRoute ? companySearch : dashboardSearch;
  const setSearchValue = isProjectsRoute && !isProjectDetailRoute
    ? setProjectSearch
    : isCompaniesRoute
      ? setCompanySearch
      : setDashboardSearch;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main" aria-label={`${header.title} 본문`}>
        <div className="container">
          <Topbar
            title={header.title}
            description={header.description}
            showSearch={header.showSearch}
            searchId={header.searchId}
            searchHelpText={header.searchHelpText}
            searchPlaceholder={header.searchPlaceholder}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          <MobileNav />
          <Outlet context={{ companySearch, setCompanySearch, projectSearch, setProjectSearch }} />
        </div>
      </main>
    </div>
  );
}
