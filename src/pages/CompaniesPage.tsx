import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { CompanyDetailPanel } from "../components/CompanyDetailPanel";
import { useDashboardData } from "../components/DashboardDataProvider";
import { CompanyList } from "../components/CompanyList";
import type { AppShellOutletContext } from "../components/AppShell";
import {
  filterCompaniesByScope,
  getScopeFromSearchParams,
  type ScopeFilter,
} from "../data/dashboard";

function includesSearch(value: string, query: string) {
  return value.toLowerCase().includes(query);
}

function getScopeCopy(scope: ScopeFilter) {
  if (scope === "completed") {
    return {
      title: "완료 기업",
      description: "현재 진행중 프로젝트가 없는 기업 이력을 확인합니다.",
    };
  }

  return {
    title: "진행중 기업",
    description: "현재 진행중 프로젝트가 있는 기업을 빠르게 확인합니다.",
  };
}

export function CompaniesPage() {
  const { companySearch, setCompanySearch } = useOutletContext<AppShellOutletContext>();
  const { clientCompanies } = useDashboardData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedClientId, setSelectedClientId] = useState("");
  const scope = getScopeFromSearchParams(searchParams);
  const scopeCopy = getScopeCopy(scope);
  const normalizedQuery = companySearch.trim().toLowerCase();
  const scopedCompanies = filterCompaniesByScope(clientCompanies, scope);
  const filteredCompanies = scopedCompanies.filter((item) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      includesSearch(item.client.companyName, normalizedQuery) ||
      includesSearch(item.client.contactName, normalizedQuery) ||
      includesSearch(item.client.email, normalizedQuery)
    );
  });

  useEffect(() => {
    if (searchParams.get("scope") !== scope) {
      setSearchParams({ scope }, { replace: true });
    }
  }, [scope, searchParams, setSearchParams]);

  useEffect(() => {
    if (filteredCompanies.length === 0) {
      setSelectedClientId("");
      return;
    }

    const hasSelectedItem = filteredCompanies.some((item) => item.client.id === selectedClientId);

    if (!hasSelectedItem) {
      setSelectedClientId(filteredCompanies[0].client.id);
    }
  }, [filteredCompanies, selectedClientId]);

  const selectedCompany =
    filteredCompanies.find((item) => item.client.id === selectedClientId) ?? filteredCompanies[0] ?? null;

  return (
    <section className="company-directory">
      <div className="company-directory-layout">
        <CompanyList
          title={scopeCopy.title}
          description={scopeCopy.description}
          items={filteredCompanies}
          selectedClientId={selectedCompany?.client.id ?? ""}
          onSelect={setSelectedClientId}
          searchValue={companySearch}
          onSearchChange={setCompanySearch}
        />
        <CompanyDetailPanel item={selectedCompany} scope={scope} />
      </div>
    </section>
  );
}
