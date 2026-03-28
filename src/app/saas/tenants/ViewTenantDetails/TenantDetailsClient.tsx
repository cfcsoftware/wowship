"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import SaasNavbar from "@/components/layout/SaasNavbar";
import PanelFooter from "@/components/layout/PanelFooter";
import SaasSidebar from "@/components/layout/SaasSidebar";
import { SaasAuthHandler } from "@/utils/saasAuthHandler";
import { ArrowLeft, Loader, Eye, XCircle } from "lucide-react";

// --- TYPE DEFINITIONS ---
interface KycRecord {
  id: number;
  pan_number: string | null;
  pan_image: string | null;
  aadhar_number: string | null;
  aadhar_front_image: string | null;
  aadhar_back_image: string | null;
  gst_number: string | null;
  gst_document_image: string | null;
  business_register_no: string | null;
  kyc_status: string;
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

interface WalletData {
  wallet_id: number;
  balance: number;
  currency: string;
}

interface Transaction {
  transaction_id: number;
  amount: number;
  description: string;
  created_at: string;
}

interface TenantDetails {
  tenant_id: number;
  tenant_name: string;
  schema_name: string;
  cusotm_id: string;
  kyc_records: KycRecord[];
  wallet_data: WalletData;
  transactions: Transaction[];
}

// --- HELPER COMPONENTS ---
const ImagePreview: React.FC<{ imageUrl: string | null; onImageClick: (url: string) => void }> = ({
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
      className="group relative w-24 h-24 rounded-md overflow-hidden border border-slate-300 transition-shadow hover:shadow-lg"
      type="button"
    >
      <Image src={imageUrl} alt="preview" fill style={{ objectFit: "cover" }} />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Eye size={24} className="text-white" />
      </div>
    </button>
  );
};

// --- MAIN PAGE COMPONENT ---
const TenantDetailsClient: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  const [tenant, setTenant] = useState<TenantDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [magnifiedImage, setMagnifiedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setMagnifiedImage(imageUrl);
  };

  const closeModal = () => {
    setMagnifiedImage(null);
  };

  useEffect(() => {
    if (!tenantId) {
      setError("Tenant ID not provided in the URL.");
      setIsLoading(false);
      return;
    }

    const fetchTenantDetails = async () => {
      try {
        setIsLoading(true);
        const response = await SaasAuthHandler<TenantDetails>(
          `/api/v1/saas/tenant-kyc-detail/${tenantId}/view/`
        );

        if (response) {
          setTenant(response);
          setError(null);
        } else {
          setTenant(null);
          setError("Tenant details not found.");
        }
      } catch {
        console.error("Failed to fetch tenant details:");
        setError("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenantDetails();
  }, [tenantId]);

  const renderDetailCard = (title: string, data: object) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data).map(([key, value]) => {
          const isImage = [
            "pan_image",
            "aadhar_front_image",
            "aadhar_back_image",
            "gst_document_image",
            "shop_logo",
            "cancelled_cheque",
          ].includes(key);

          return (
            <div key={key} className="flex flex-col space-y-1">
              <span className="text-xs font-semibold uppercase text-slate-500">{key.replace(/_/g, " ")}</span>
              {isImage && typeof value === "string" ? (
                <ImagePreview imageUrl={value} onImageClick={handleImageClick} />
              ) : (
                <span className="text-sm text-slate-800 break-words">{value !== null && value !== "" ? String(value) : "N/A"}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SaasSidebar />
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <SaasNavbar />
        <main className="flex-1 p-6 md:p-10 space-y-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-slate-200 transition-colors" type="button">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-slate-800">Tenant Details</h1>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center py-24">
              <Loader size={64} className="text-slate-300 animate-spin" />
              <p className="mt-4 text-slate-600 font-semibold">Loading tenant details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-red-600 font-semibold text-lg">{error}</p>
            </div>
          ) : tenant ? (
            <div className="space-y-6">
              {renderDetailCard("Tenant Info", {
                tenant_name: tenant.tenant_name,
                schema_name: tenant.schema_name,
                cusotm_id: tenant.cusotm_id,
              })}
              {tenant.kyc_records.map((record) => renderDetailCard("KYC Record", record))}
              {renderDetailCard("Wallet Details", tenant.wallet_data)}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Transactions</h2>
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/80">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80">
                    {tenant.transactions.map((tx) => (
                      <tr key={tx.transaction_id}>
                        <td className="px-6 py-4">{tx.transaction_id}</td>
                        <td className="px-6 py-4">{tx.amount}</td>
                        <td className="px-6 py-4">{tx.description}</td>
                        <td className="px-6 py-4">{new Date(tx.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-slate-600 font-semibold text-lg">No details found for this tenant.</p>
            </div>
          )}
        </main>
        <PanelFooter />
      </div>

      {magnifiedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 transition-opacity duration-300"
        >
          <div className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-white bg-slate-800 rounded-full p-1 hover:bg-red-500 transition-colors z-10"
              type="button"
            >
              <XCircle size={32} />
            </button>
            <Image
              src={magnifiedImage}
              alt="Magnified Preview"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDetailsClient;
