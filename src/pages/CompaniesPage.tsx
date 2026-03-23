import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyDetailPanel } from "../components/CompanyDetailPanel";
import { CompanyList } from "../components/CompanyList";
import type { AppShellOutletContext } from "../components/AppShell";
import { clientCompanies } from "../data/dashboard";

function includesSearch(value: string, query: string) {
  return value.toLowerCase().includes(query);
}

export function CompaniesPage() {
  const { companySearch, setCompanySearch } = useOutletContext<AppShellOutletContext>();
  const [selectedClientId, setSelectedClientId] = useState(clientCompanies[0]?.client.id ?? "");

  const normalizedQuery = companySearch.trim().toLowerCase();
  const filteredCompanies = clientCompanies.filter((item) => {
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
    if (filteredCompanies.length === 0) {
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
          items={filteredCompanies}
          selectedClientId={selectedCompany?.client.id ?? ""}
          onSelect={setSelectedClientId}
          searchValue={companySearch}
          onSearchChange={setCompanySearch}
        />
        <CompanyDetailPanel item={selectedCompany} />
      </div>
    </section>
  );
}
