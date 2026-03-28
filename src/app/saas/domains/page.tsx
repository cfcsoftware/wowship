"use client";

import React, { useState, useMemo, FC, useEffect } from "react";
import SaasNavbar from "@/components/layout/SaasNavbar";
import PanelFooter from "@/components/layout/PanelFooter";
import SaasSidebar from "@/components/layout/SaasSidebar";
import { Search, MoreVertical, ChevronDown, ChevronUp, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Loader } from "lucide-react";
import { NextPage } from "next";
import { SaasAuthHandler } from "@/utils/saasAuthHandler";

// --- TYPE DEFINITIONS ---
interface Domain {
  id: number;
  domain: string;
  is_primary: boolean;
  custom_domain_url: string | null;
  browse: string | null;
  tenant: number;
}

type SortDirection = 'ascending' | 'descending';

interface SortConfig {
    key: keyof Domain;
    direction: SortDirection;
}

// --- HELPER & CHILD COMPONENTS ---
const PrimaryBadge: FC<{ isPrimary: boolean }> = ({ isPrimary }) => {
  const statusConfig: { [key: string]: { classes: string; label: string } } = {
    true: { classes: "bg-green-100 text-green-800", label: "Primary" },
    false: { classes: "bg-gray-100 text-gray-800", label: "Secondary" },
  };
  const { classes, label } = statusConfig[isPrimary.toString()];
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>{label}</span>;
};

// --- MAIN PAGE COMPONENT ---
const DomainsPage: NextPage = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'domain', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setIsLoading(true);
        const data = await SaasAuthHandler<Domain[]>('/api/v1/saas/domains');
        setDomains(data);
        setError(null);
      } catch (err: unknown) {
        setError((err as Error).message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, []);

  const sortedAndFilteredDomains = useMemo(() => {
    const sortableItems = [...domains].filter(domain =>
      domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [domains, searchTerm, sortConfig]);

  const paginatedDomains = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredDomains.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredDomains, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredDomains.length / itemsPerPage);

  const requestSort = (key: keyof Domain) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader: FC<{ columnKey: keyof Domain, title: string }> = ({ columnKey, title }) => (
    <th scope="col" className="px-6 py-3">
        <button onClick={() => requestSort(columnKey)} className="flex items-center gap-1.5 group">
            {title}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {sortConfig.key === columnKey && sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </span>
        </button>
    </th>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SaasSidebar />
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <SaasNavbar />
        <main className="flex-1 p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Domains</h1>
            </div>
          </div>

          {/* Datatable Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200/80">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search domains..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-shadow"
                  />
                </div>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-white uppercase bg-orange-600 font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-3">No.</th>
                    <SortableHeader columnKey="id" title="ID" />
                    <SortableHeader columnKey="domain" title="Domain Name" />
                    <SortableHeader columnKey="is_primary" title="Primary" />
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="flex flex-col items-center">
                            <Loader size={48} className="text-slate-300 animate-spin mb-2" />
                            <p className="text-slate-600 font-semibold">Loading domains...</p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="flex flex-col items-center">
                            <p className="text-red-600 font-semibold">Error: {error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedDomains.length > 0 ? (
                    paginatedDomains.map((domain, index) => (
                      <tr key={domain.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="px-6 py-4">{domain.id}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                          {domain.domain}
                        </th>
                        <td className="px-6 py-4">
                          <PrimaryBadge isPrimary={domain.is_primary} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative inline-block">
                              {/* Implement dropdown menu for actions here */}
                              <button className="p-2 text-slate-500 rounded-md hover:bg-slate-200/60">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-16">
                        <div className="flex flex-col items-center">
                            <Search size={48} className="text-slate-300 mb-2" />
                            <p className="text-slate-600 font-semibold">No domains found</p>
                            <p className="text-slate-400 text-xs">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!isLoading && !error && paginatedDomains.length > 0 && (
              <div className="p-4 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                      <span>Rows per page:</span>
                      <select value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))} className="p-1 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none">
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                      </select>
                  </div>
                  <div className="flex items-center gap-3">
                      <span>Page {currentPage} of {totalPages}</span>
                      <div className="flex items-center gap-1">
                          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"><ChevronsLeft size={16} /></button>
                          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"><ChevronLeft size={16} /></button>
                          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"><ChevronRight size={16} /></button>
                          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"><ChevronsRight size={16} /></button>
                      </div>
                  </div>
              </div>
            )}
          </div>
        </main>
        <PanelFooter />
      </div>
    </div>
  );
};

export default DomainsPage;