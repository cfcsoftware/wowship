"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  ShieldCheck,
  KeyRound,
  Pencil,
} from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Interfaces
======================= */

interface Permission {
  id: number;
  name: string;
  code: string;
}

interface RolePermission {
  id: number;
  role: string;
  permissions: Permission[];
}

/* =======================
   Helpers
======================= */

const COLOR_MAP = [
  "bg-orange-100 text-orange-700",
  "bg-orange-100 text-orange-700",
  "bg-orange-100 text-orange-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

const getPermissionColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLOR_MAP[Math.abs(hash) % COLOR_MAP.length];
};

/* =======================
   Component
======================= */

const RolePermissionListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =======================
     Fetch Data
  ======================= */

  useEffect(() => {
    async function fetchRolePermissions() {
      try {
        setLoading(true);
        setError(null);
        const response = await tenantAuthHandler<{ data: RolePermission[] }>(
          "/role/permissions/?api=true"
        );
        setData(response?.data || []);
      } catch {
        setError("Failed to fetch role permissions");
      } finally {
        setLoading(false);
      }
    }

    fetchRolePermissions();
  }, []);

  /* =======================
     Filtering
  ======================= */

const filteredData = data.filter((role) => {
  if (!role.permissions || role.permissions.length === 0) return false;

  const search = searchTerm.toLowerCase();

  return (
    role.role.toLowerCase().includes(search) ||
    role.permissions.some(
      (perm) =>
        perm.name.toLowerCase().includes(search) ||
        perm.code.toLowerCase().includes(search)
    )
  );
});


  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
          Role Permissions
        </h1>
        <a
          href="/role-permission/permission-add"
          className="inline-block px-5 py-2 rounded-xl bg-orange-600 text-white font-semibold text-sm shadow hover:bg-orange-700 transition-colors"
        >
          Add Permission
        </a>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          />
          <input
            type="text"
            placeholder="Search role or permission..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-16 text-center text-[#8E8E93]">
          Loading role permissions...
        </div>
      ) : error ? (
        <div className="py-16 text-center text-[#8E8E93]">{error}</div>
      ) : filteredData.length ? (
        <div className="space-y-6">
          {filteredData.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-3xl shadow-sm p-6"
            >
              {/* Role Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1C1C1E]">
                      {role.role}
                    </h2>
                    <p className="text-xs text-[#8E8E93]">
                      {role.permissions.length} permission
                      {role.permissions.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#F2F2F7] hover:bg-orange-50 text-orange-600"
                  onClick={() => {
                    // future: open edit drawer
                    console.log("Edit permissions for", role.role);
                  }}
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>

              {/* Permissions */}
              {role.permissions.length ? (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm.id}
                      title={perm.code}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-default ${getPermissionColor(
                        perm.name
                      )}`}
                    >
                      <KeyRound size={12} />
                      {perm.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#8E8E93] italic">
                  No permissions assigned.
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-[#8E8E93]">
          No roles or permissions found.
        </div>
      )}
    </div>
  );
};

export default RolePermissionListPage;
