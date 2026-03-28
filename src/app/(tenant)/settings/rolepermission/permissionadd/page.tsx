"use client";

import React, { useEffect, useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Interfaces
======================= */

interface Role {
  id: number;
  name: string;
  description: string;
}

interface Permission {
  id: number;
  code: string;
}

interface PermissionResponse {
  roles: Role[];
  permissions: Record<string, Permission[]>;
}

/* =======================
   Component
======================= */

const AssignPermissionPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<
    Record<string, Permission[]>
  >({});
  const [selectedRole, setSelectedRole] = useState<number | "">("");
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* =======================
     Fetch Roles & Permissions
  ======================= */

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await tenantAuthHandler<PermissionResponse>(
          "/permission/assign-to-role/?api=true"
        );
        setRoles(response.roles || []);
        setPermissions(response.permissions || {});
      } catch {
        setError("Failed to load roles and permissions");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* =======================
     Handlers
  ======================= */

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const toggleModule = (modulePermissions: Permission[]) => {
    const ids = modulePermissions.map((p) => p.id);
    const allSelected = ids.every((id) =>
      selectedPermissions.includes(id)
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !ids.includes(id))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...new Set([...prev, ...ids]),
      ]);
    }
  };

const handleSubmit = async () => {
  if (!selectedRole) {
    setError("Please select a role");
    return;
  }

  if (selectedPermissions.length === 0) {
    setError("Select at least one permission");
    return;
  }

  try {
    setSaving(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("role_id", selectedRole.toString());

    selectedPermissions.forEach((id) => {
      formData.append("permission_id[]", id.toString());
    });

    await tenantAuthHandler(
      "/permission/assign-to-role/?api=true",
      {
        method: "POST",
        body: formData,
      }
    );

    setSuccess("Permissions assigned successfully!");
    setSelectedPermissions([]);
  } catch {
    setError("Failed to assign permissions");
  } finally {
    setSaving(false);
  }
};


  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
          Assign Permissions
        </h1>
        <p className="text-[#8E8E93] mt-1 text-sm">
          Assign permissions to a specific role.
        </p>
      </div>

      {/* Status */}
      {error && (
        <div className="mb-6 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}

      {/* Role Selector */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
        <label className="block text-xs font-bold text-[#8E8E93] mb-2 uppercase">
          Select Role
        </label>
        <select
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(Number(e.target.value))
          }
          className="w-full max-w-md px-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium"
        >
          <option value="">Choose role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Permissions */}
      {loading ? (
        <div className="py-12 text-center text-[#8E8E93]">
          Loading permissions...
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(permissions).map(
            ([module, perms]) => {
              const ids = perms.map((p) => p.id);
              const allSelected = ids.every((id) =>
                selectedPermissions.includes(id)
              );

              return (
                <div
                  key={module}
                  className="bg-white rounded-3xl shadow-sm p-6"
                >
                  {/* Module Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-orange-600" />
                      <h2 className="text-lg font-bold">{module}</h2>
                    </div>

                    <button
                      onClick={() => toggleModule(perms)}
                      className="text-sm font-medium text-orange-600 hover:underline"
                    >
                      {allSelected ? "Unselect All" : "Select All"}
                    </button>
                  </div>

                  {/* Permission Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {perms.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#F2F2F7] cursor-pointer hover:bg-orange-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(
                            perm.id
                          )}
                          onChange={() =>
                            togglePermission(perm.id)
                          }
                          className="accent-orange-600"
                        />
                        <span className="text-sm font-medium">
                          {perm.code}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium flex items-center gap-2 disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Permissions"}
        </button>
      </div>
    </div>
  );
};

export default AssignPermissionPage;
