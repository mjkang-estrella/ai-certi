import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getScopeFromSearchParams } from "../data/dashboard";
import { DashboardDataProvider } from "./DashboardDataProvider";
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
  showSearch: false,
  searchId: "dashboard-search",
  searchHelpText: "프로젝트명, 담당자명 또는 기업명으로 현재 진행 건을 검색합니다.",
  searchPlaceholder: "기업명, 담당자, 프로젝트 검색",
};

const scheduleHeader: HeaderConfig = {
  title: "일정",
  description: "이번 주 시험 및 검토 일정을 확인하고, 일정 미확정 건을 함께 점검합니다.",
  showSearch: false,
  searchId: "schedule-search",
  searchHelpText: "일정 화면에서는 검색을 사용하지 않습니다.",
  searchPlaceholder: "검색 사용 안 함",
};

const intakeHeader: HeaderConfig = {
  title: "신규 접수",
  description: "새로 들어온 건과 후속 확인이 필요한 프로젝트를 한 화면에서 관리합니다.",
  showSearch: false,
  searchId: "intake-search",
  searchHelpText: "신규 접수 화면에서는 검색을 사용하지 않습니다.",
  searchPlaceholder: "검색 사용 안 함",
};

const activeCompaniesHeader: HeaderConfig = {
  title: "진행중 기업",
  description: "현재 진행중 프로젝트가 있는 기업을 빠르게 확인합니다.",
  showSearch: true,
  searchId: "company-search",
  searchHelpText: "기업명, 담당자명 또는 이메일로 진행중 기업을 검색합니다.",
  searchPlaceholder: "기업 검색",
};

const completedCompaniesHeader: HeaderConfig = {
  title: "완료 기업",
  description: "현재 진행중 프로젝트가 없는 기업 이력을 확인합니다.",
  showSearch: true,
  searchId: "company-search",
  searchHelpText: "기업명, 담당자명 또는 이메일로 완료 기업을 검색합니다.",
  searchPlaceholder: "기업 검색",
};

const activeProjectsHeader: HeaderConfig = {
  title: "진행중 프로젝트",
  description: "현재 처리 중인 프로젝트를 상태와 담당자 기준으로 좁혀 봅니다.",
  showSearch: true,
  searchId: "project-search",
  searchHelpText: "기업명, 프로젝트명 또는 담당자명으로 진행중 프로젝트를 검색합니다.",
  searchPlaceholder: "기업명, 담당자, 프로젝트 검색",
};

const completedProjectsHeader: HeaderConfig = {
  title: "완료 프로젝트",
  description: "종결된 프로젝트 이력을 확인합니다.",
  showSearch: true,
  searchId: "project-search",
  searchHelpText: "기업명, 프로젝트명 또는 담당자명으로 완료 프로젝트를 검색합니다.",
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
  const [companySearch, setCompanySearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isProjectDetailRoute = /^\/projects\/[^/]+$/.test(location.pathname);
  const scope = getScopeFromSearchParams(searchParams);

  let header = dashboardHeader;
  let searchValue = "";
  let setSearchValue: (value: string) => void = () => {};

  if (location.pathname === "/schedule") {
    header = scheduleHeader;
  } else if (location.pathname === "/intake") {
    header = intakeHeader;
  } else if (isProjectDetailRoute) {
    header = projectDetailHeader;
  } else if (location.pathname === "/projects") {
    header = scope === "completed" ? completedProjectsHeader : activeProjectsHeader;
    searchValue = projectSearch;
    setSearchValue = setProjectSearch;
  } else if (location.pathname === "/companies") {
    header = scope === "completed" ? completedCompaniesHeader : activeCompaniesHeader;
    searchValue = companySearch;
    setSearchValue = setCompanySearch;
  }

  return (
    <DashboardDataProvider>
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
    </DashboardDataProvider>
  );
}
