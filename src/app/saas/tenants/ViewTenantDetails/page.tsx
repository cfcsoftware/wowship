import React, { Suspense } from "react";
import TenantDetailsClient from "./TenantDetailsClient";
export default function ViewTenantDetailsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading tenant details...</div>}>
      <TenantDetailsClient />
    </Suspense>
  );
}