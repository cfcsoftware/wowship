"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ShieldCheck,
  X,
  Save,
} from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Interfaces
======================= */

interface Role {
  id: number;
  name: string;
  description: string;
}

/* =======================
   Component
======================= */

const RolesListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Sidebar state */
  const [openSidebar, setOpenSidebar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  /* =======================
     Fetch Roles
  ======================= */

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tenantAuthHandler<Role[]>(
        "/roles/list/?api=true"
      );
      setRoles(response || []);
    } catch {
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* =======================
     Filtering
  ======================= */

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     Add Role
  ======================= */

  const handleAddRole = async () => {
    if (!form.name.trim()) {
      setFormError("Role name is required");
      return;
    }

    try {
      setSaving(true);
      setFormError(null);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);

      await tenantAuthHandler("/roles/add/?api=true", {
        method: "POST",
        body: formData,
      });

      // reset + close
      setForm({ name: "", description: "" });
      setOpenSidebar(false);

      // refresh list
      fetchRoles();
    } catch {
      setFormError("Failed to create role");
    } finally {
      setSaving(false);
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
            Roles
          </h1>
          <p className="text-[#8E8E93] mt-1 text-sm">
            Manage system roles and permissions.
          </p>
        </div>

        <button
          onClick={() => setOpenSidebar(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-md"
        >
          <Plus size={18} />
          New Role
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          />
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F9F9F9]">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[30%]">
                Role
              </th>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[60%]">
                Description
              </th>
              <th className="w-[5%]" />
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5E5EA]">
            {loading ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-[#8E8E93]">
                  Loading roles...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="py-12 text-center text-[#8E8E93]">
                  {error}
                </td>
              </tr>
            ) : filteredRoles.length ? (
              filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-[#F2F2F7] group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                        <ShieldCheck size={18} />
                      </div>
                      <span className="text-sm font-bold">
                        {role.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-[#48484A]">
                    {role.description}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded-lg text-[#8E8E93] hover:bg-white opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-12 text-center text-[#8E8E93]">
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =======================
         Right Sidebar
      ======================= */}
      {openSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setOpenSidebar(false)}
          />

          {/* Sidebar */}
          <div className="w-full max-w-md bg-white h-full shadow-xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add Role</h2>
              <button onClick={() => setOpenSidebar(false)}>
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">
                {formError}
              </div>
            )}

            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-xs font-bold text-[#8E8E93] mb-2 uppercase">
                  Role Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8E8E93] mb-2 uppercase">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F2F2F7] rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenSidebar(false)}
                className="px-5 py-2.5 rounded-xl bg-[#F2F2F7]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-orange-600 text-white flex items-center gap-2 disabled:opacity-60"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesListPage;
