"use client";

import React, { useState, useMemo, FC, useEffect } from "react";
import Image from "next/image";
import SaasNavbar from "@/components/layout/SaasNavbar";
import PanelFooter from "@/components/layout/PanelFooter";
import SaasSidebar from "@/components/layout/SaasSidebar";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Loader,
  XCircle,
  Eye,
} from "lucide-react";
import { NextPage } from "next";
import { SaasAuthHandler } from "@/utils/saasAuthHandler";

// --- TYPE DEFINITIONS ---
interface KycDetails {
  id: number;
  pan_number: string | null;
  pan_image: string | null;
  aadhar_number: string | null;
  aadhar_front_image: string | null;
  aadhar_back_image: string | null;
  gst_number: string | null;
  gst_document_image: string | null;
  business_register_no: string | null;
  kyc_status: "Pending" | "Approved" | "Rejected";
  shop_name: string | null;
  shop_url: string | null;
  shop_description: string | null;
  shop_logo: string | null;
  bank_holder_name: string | null;
  bank_ac_no: string | null;
  ifsc_code: string | null;
  bank_name: string | null;
  cancelled_cheque: string | null;
  created_at: string;
  updated_at: string;
  user: number;
  tenant: number;
}

interface Wallet {
  tenant_id: number;
  balance: number;
  currency: string;
  wallet_id: number;
  status: "active" | "inactive";
}

interface TenantData {
  kyc_details: KycDetails;
  wallet: Wallet;
}

interface ApiData {
  data: TenantData[];
}

type SortDirection = "ascending" | "descending";

interface SortConfig {
  key: string;
  direction: SortDirection;
}

// --- HELPER & CHILD COMPONENTS ---
const StatusBadge: FC<{ status: string }> = ({ status }) => {
  const statusConfig: { [key: string]: { classes: string; label: string } } = {
    Pending: { classes: "bg-yellow-100 text-yellow-800", label: "Pending" },
    Approved: { classes: "bg-green-100 text-green-800", label: "Approved" },
    Rejected: { classes: "bg-red-100 text-red-800", label: "Rejected" },
    active: { classes: "bg-green-100 text-green-800", label: "Active" },
    inactive: { classes: "bg-gray-100 text-gray-800", label: "Inactive" },
  };

  const { classes, label } =
    statusConfig[status] || { classes: "bg-gray-100 text-gray-800", label: "Unknown" };

  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>{label}</span>;
};

// Image Preview Component using next/image
const ImagePreview: FC<{ imageUrl: string | null; onImageClick: (url: string) => void }> = ({
  imageUrl,
  onImageClick,
}) => {
  if (!imageUrl) {
    return <span className="text-slate-400 text-xs">No Image</span>;
  }

  const isValidUrl = imageUrl.length > 0 && (imageUrl.startsWith("http") || imageUrl.startsWith("/"));

  if (!isValidUrl) {
    return <span className="text-red-400 text-xs">Invalid URL</span>;
  }

  return (
    <button
      onClick={() => onImageClick(imageUrl)}
      className="group relative w-12 h-12 rounded-md overflow-hidden border border-slate-300 transition-shadow hover:shadow-lg"
      type="button"
    >
      <Image src={imageUrl} alt="preview" fill style={{ objectFit: "cover" }} />
      <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Eye size={20} className="text-white" />
      </div>
    </button>
  );
};

// --- MAIN PAGE COMPONENT ---
const TenantsPage: NextPage = () => {
  const router = useRouter();
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "kyc_details.tenant",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [magnifiedImage, setMagnifiedImage] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantData | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    kyc_status: "Pending" as "Pending" | "Approved" | "Rejected",
    balance_amount: 0,
    tnx_description: "",
  });

  const handleImageClick = (imageUrl: string) => {
    setMagnifiedImage(imageUrl);
  };

  const closeModal = () => {
    setMagnifiedImage(null);
  };

  const handleOpenUpdateModal = (tenant: TenantData) => {
    setSelectedTenant(tenant);
    setUpdateFormData({
      kyc_status: tenant.kyc_details.kyc_status,
      balance_amount: 0,
      tnx_description: "",
    });
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTenant(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenant) return;

    const tenantId = selectedTenant.kyc_details.tenant;
    const url = `/api/v1/saas/tenant-kyc-status/${tenantId}/update/`;

    try {
      await SaasAuthHandler(url, {
        method: "POST",
        body: JSON.stringify({
          kyc_status: updateFormData.kyc_status,
          balance_amount: Number(updateFormData.balance_amount),
          tnx_description: updateFormData.tnx_description,
        }),
      });
      handleCloseUpdateModal();
      fetchTenants();
    } catch (error) {
      console.error("Failed to update tenant status:", error);
    }
  };

  const handleViewDetails = (tenantId: number) => {
    router.push(`/saas/tenants/ViewTenantDetails?tenantId=${tenantId}`);
  };

  const fetchTenants = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const apiData = await SaasAuthHandler<ApiData>("/api/v1/saas/tenant-kyc-details");
      if (apiData && Array.isArray(apiData.data)) {
        setTenants(apiData.data);
      } else {
        setTenants([]);
      }
      setError(null);
    } catch (err: unknown) {
      console.error("Failed to fetch tenant data:", err);
      setError((err as Error).message || "An unexpected error occurred.");
      setTenants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  const sortedAndFilteredTenants = useMemo(() => {
    const tenantsArray = Array.isArray(tenants) ? tenants : [];

    const sortableItems = [...tenantsArray].filter(
      (tenant) =>
        (tenant.kyc_details.shop_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        tenant.kyc_details.tenant.toString().includes(searchTerm)
    );

    sortableItems.sort((a, b) => {
      const getNestedValue = (obj: TenantData, key: string) => {
        const keys = key.split(".");
        let value: unknown = obj;
        for (const k of keys) {
          if (value && typeof value === "object" && k in value) {
            value = (value as { [key: string]: unknown })[k];
          } else {
            return undefined;
          }
        }
        return value;
      };

      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "ascending"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [tenants, searchTerm, sortConfig]);

  const paginatedTenants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredTenants.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedAndFilteredTenants, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredTenants.length / itemsPerPage);

  const requestSort = (key: string) => {
    let direction: SortDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const SortableHeader: FC<{ columnKey: string; title: string }> = ({ columnKey, title }) => (
    <th scope="col" className="px-6 py-3">
      <button onClick={() => requestSort(columnKey)} className="flex items-center gap-1.5 group">
        {title}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          {sortConfig.key === columnKey && sortConfig.direction === "ascending" ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )}
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
              <h1 className="text-3xl font-bold text-slate-800">Tenants</h1>
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
                  placeholder="Search tenants by name or ID..."
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
                    <th scope="col" className="px-6 py-3">
                      No.
                    </th>
                    <SortableHeader columnKey="kyc_details.tenant" title="Tenant ID" />
                    <SortableHeader columnKey="kyc_details.shop_name" title="Shop Name" />
                    <SortableHeader columnKey="kyc_details.kyc_status" title="KYC Status" />
                    <SortableHeader columnKey="kyc_details.pan_number" title="PAN" />
                    <th scope="col" className="px-6 py-3">
                      PAN Image
                    </th>
                    <SortableHeader columnKey="kyc_details.aadhar_number" title="Aadhaar" />
                    <th scope="col" className="px-6 py-3">
                      Aadhaar Front
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aadhaar Back
                    </th>
                    <SortableHeader columnKey="kyc_details.gst_number" title="GST" />
                    <th scope="col" className="px-6 py-3">
                      GST Document
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Shop Logo
                    </th>
                    <SortableHeader columnKey="kyc_details.bank_holder_name" title="Bank Holder" />
                    <SortableHeader columnKey="kyc_details.bank_ac_no" title="Bank A/C" />
                    <SortableHeader columnKey="kyc_details.ifsc_code" title="IFSC" />
                    <th scope="col" className="px-6 py-3">
                      Cancelled Cheque
                    </th>
                    <SortableHeader columnKey="wallet.balance" title="Wallet Balance" />
                    <th scope="col" className="px-6 py-3">
                      Wallet Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {isLoading ? (
                    <tr>
                      <td colSpan={19} className="text-center py-16">
                        <div className="flex flex-col items-center">
                          <Loader size={48} className="text-slate-300 animate-spin mb-2" />
                          <p className="text-slate-600 font-semibold">Loading tenants...</p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={19} className="text-center py-16">
                        <div className="flex flex-col items-center">
                          <p className="text-red-600 font-semibold">Error: {error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedTenants.length > 0 ? (
                    paginatedTenants.map((tenant, index) => (
                      <tr key={tenant.kyc_details.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="px-6 py-4">{tenant.kyc_details.tenant}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                          {tenant.kyc_details.shop_name || "N/A"}
                        </th>
                        <td className="px-6 py-4">
                          <StatusBadge status={tenant.kyc_details.kyc_status} />
                        </td>
                        <td className="px-6 py-4">{tenant.kyc_details.pan_number || "N/A"}</td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.pan_image} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">{tenant.kyc_details.aadhar_number || "N/A"}</td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.aadhar_front_image} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.aadhar_back_image} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">{tenant.kyc_details.gst_number || "N/A"}</td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.gst_document_image} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.shop_logo} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">{tenant.kyc_details.bank_holder_name || "N/A"}</td>
                        <td className="px-6 py-4">{tenant.kyc_details.bank_ac_no || "N/A"}</td>
                        <td className="px-6 py-4">{tenant.kyc_details.ifsc_code || "N/A"}</td>
                        <td className="px-6 py-4">
                          <ImagePreview imageUrl={tenant.kyc_details.cancelled_cheque} onImageClick={handleImageClick} />
                        </td>
                        <td className="px-6 py-4">
                          {tenant.wallet ? `${tenant.wallet.currency} ${tenant.wallet.balance.toFixed(2)}` : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                                                    {tenant.wallet ? <StatusBadge status={tenant.wallet.status} /> : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() => handleOpenUpdateModal(tenant)}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium hover:bg-orange-200"
                            >
                              Update Status
                            </button>
                            <button
                              onClick={() => handleViewDetails(tenant.kyc_details.tenant)}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium hover:bg-green-200"
                            >
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={19} className="text-center py-16">
                        <div className="flex flex-col items-center">
                          <Search size={48} className="text-slate-300 mb-2" />
                          <p className="text-slate-600 font-semibold">No tenants found</p>
                          <p className="text-slate-400 text-xs">Try adjusting your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!isLoading && !error && sortedAndFilteredTenants.length > 0 && (
              <div className="p-4 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span>Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="p-1 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                    >
                      <ChevronsLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                    >
                      <ChevronsRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <PanelFooter />
      </div>

      {/* Image Magnification Modal */}
      {magnifiedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        >
          <div
            className="relative max-w-5xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10"
              type="button"
            >
              <XCircle size={32} />
            </button>
            <div className="relative w-full h-[90vh] rounded-lg shadow-lg">
              <Image
                src={magnifiedImage}
                alt="Magnified Preview"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Update Tenant Modal */}
      {isUpdateModalOpen && selectedTenant && (
        <div className="fixed inset-0 z-50 flex justify-end bg-opacity-50">
          <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Update Tenant {selectedTenant.kyc_details.tenant}
              </h2>
              <button
                onClick={handleCloseUpdateModal}
                className="p-2 rounded-full hover:bg-slate-200"
                type="button"
              >
                <XCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="kyc_status"
                    className="block text-sm font-medium text-slate-700"
                  >
                    KYC Status
                  </label>
                  <select
                    id="kyc_status"
                    name="kyc_status"
                    value={updateFormData.kyc_status}
                    onChange={handleFormChange}
                    className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="balance_amount"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Balance Amount
                  </label>
                  <input
                    type="number"
                    id="balance_amount"
                    name="balance_amount"
                    value={updateFormData.balance_amount}
                    onChange={handleFormChange}
                    className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="tnx_description"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Transaction Description
                  </label>
                  <textarea
                    id="tnx_description"
                    name="tnx_description"
                    value={updateFormData.tnx_description}
                    onChange={handleFormChange}
                    rows={3}
                    className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseUpdateModal}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsPage;
