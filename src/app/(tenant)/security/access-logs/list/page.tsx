"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Interfaces
======================= */

interface AccessLog {
  id: number;
  module: string;
  object_id: string | null;
  action: string;
  message: string;
  meta: Record<string, unknown>;
  created_at: string;
  user: number;
}

/* =======================
   Helpers
======================= */

const formatLogMessage = (log: AccessLog) => {
  let primary = log.message;
  let secondary: string | null = null;

  // Case list viewed
  if (log.module === "Case" && log.action === "LIST") {
    primary = "Viewed case list";
  }

  // Event created
  if (log.module === "Event" && log.action === "CREATE") {
    primary = log.message.replace(
      /Event '(.*)' created for Case (\d+)/,
      'Created event "$1"'
    );
    secondary = `Case ID: ${log.object_id ?? "—"}`;
  }

  // Case created
  if (log.module === "Case" && log.action === "CREATE") {
    primary = "Created a new case";
  }

  // Extract readable case from object_id
  if (log.object_id?.includes("CASE-")) {
    const match = log.object_id.match(/CASE-[^ ]+ - [^>]+/);
    if (match) {
      secondary = `Case: ${match[0]}`;
    }
  } else if (log.object_id && !secondary) {
    secondary = `Reference ID: ${log.object_id}`;
  }

  return { primary, secondary };
};

const getActionStyle = (action: string) => {
  switch (action) {
    case "CREATE":
      return "bg-green-100 text-green-700 border-green-200";
    case "UPDATE":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "DELETE":
      return "bg-red-100 text-red-700 border-red-200";
    case "LIST":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString();

/* =======================
   Component
======================= */

const AccessLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        setError(null);
        const response = await tenantAuthHandler<AccessLog[]>(
          "/access-logs/list/?api=true"
        );
        setLogs(response || []);
      } catch {
        setError("Failed to fetch access logs");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  /* =======================
     Filtering
  ======================= */

  const filteredLogs = logs.filter((log) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      log.module.toLowerCase().includes(search) ||
      log.action.toLowerCase().includes(search) ||
      log.message.toLowerCase().includes(search);

    const matchesModule =
      moduleFilter === "All" || log.module === moduleFilter;

    return matchesSearch && matchesModule;
  });

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
          Access Logs
        </h1>
        <p className="text-[#8E8E93] mt-1 text-sm">
          Track system activity and important actions.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E5EA] mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2F7] rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium">
            <Filter size={16} />
            Module: {moduleFilter}
            <ChevronDown size={14} />
          </button>

          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible p-1 z-10">
            {["All", "Case", "Event", "Client"].map((m) => (
              <button
                key={m}
                onClick={() => setModuleFilter(m)}
                className={`w-full text-left px-3 py-2 text-xs rounded-lg ${
                  moduleFilter === m
                    ? "bg-orange-50 text-orange-600"
                    : "hover:bg-[#F2F2F7]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#E5E5EA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-[#F9F9F9] border-b border-[#E5E5EA]">
            <tr>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase">
                Module
              </th>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase">
                Action
              </th>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase">
                Message
              </th>
              <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase">
                Date & Time
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5E5EA]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#8E8E93]">
                  Loading logs...
                </td>
              </tr>
            ) : filteredLogs.length ? (
              filteredLogs.map((log) => {
                const { primary, secondary } = formatLogMessage(log);
                return (
                  <tr key={log.id} className="hover:bg-[#F2F2F7] group">
                    <td className="py-4 px-6 flex items-center gap-2">
                      <Shield size={16} className="text-[#8E8E93]" />
                      {log.module}
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getActionStyle(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-[#1C1C1E]">
                        {primary}
                      </p>
                      {secondary && (
                        <p className="text-xs text-[#8E8E93] mt-0.5">
                          {secondary}
                        </p>
                      )}
                    </td>

                    <td className="py-4 px-6 text-sm text-[#8E8E93]">
                      {formatDateTime(log.created_at)}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <MoreHorizontal
                        size={18}
                        className="opacity-0 group-hover:opacity-100 text-[#8E8E93]"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#8E8E93]">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between px-6 py-4 border-t text-xs text-[#8E8E93]">
          Showing {filteredLogs.length} of {logs.length} logs
          <div className="flex gap-2">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessLogsPage;
