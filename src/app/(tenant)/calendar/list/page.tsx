"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowUpDown,
  Briefcase,
} from "lucide-react";
import { tenantAuthHandler } from "@/utils/tenantAuthHandler";

/* =======================
   Interfaces
======================= */

interface CaseMini {
  id: number;
  case_title: string;
  case_number: string;
}

interface CalendarEvent {
  id: number;
  title: string;
  event_type: string;
  start_time: string;
  end_time: string;
  is_all_day: boolean;
  location: string;
  description: string;
  created_at: string;

  case: CaseMini;
}

/* =======================
   Component
======================= */

const EventCalendarListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const response = await tenantAuthHandler<CalendarEvent[]>(
          "/calendar/list/?api=true"
        );
        setEvents(response || []);
      } catch {
        setError("Failed to fetch calendar events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  /* =======================
     Filtering Logic
  ======================= */

  const filteredEvents = events.filter((e) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      e.title.toLowerCase().includes(search) ||
      e.case.case_title.toLowerCase().includes(search) ||
      e.case.case_number.toLowerCase().includes(search) ||
      e.location.toLowerCase().includes(search);

    const matchesType =
      typeFilter === "All" || e.event_type === typeFilter;

    return matchesSearch && matchesType;
  });

  /* =======================
     Event Type Badge
  ======================= */

  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "HEARING":
        return "bg-red-100 text-red-700 border-red-200";
      case "MEETING":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "DEADLINE":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString();

  return (
    <div className="p-6 bg-[#F2F2F7] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
            Event Calendar
          </h1>
          <p className="text-[#8E8E93] mt-1 text-sm">
            Track hearings, meetings, and important deadlines.
          </p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <Plus size={18} />
          New Event
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E5E5EA] mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#8E8E93]" />
          </div>
          <input
            type="text"
            placeholder="Search events, cases, or location..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F2F2F7] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-[#1C1C1E] placeholder-[#8E8E93] transition-all font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm font-medium text-[#1C1C1E] hover:bg-[#F2F2F7] transition-colors">
              <Filter size={16} className="text-[#8E8E93]" />
              <span>Type: {typeFilter}</span>
              <ChevronDown size={14} className="text-[#8E8E93]" />
            </button>

            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E5E5EA] rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-1">
              {["All", "HEARING", "MEETING", "DEADLINE"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-[#F2F2F7] ${
                    typeFilter === t
                      ? "text-orange-600 bg-orange-50"
                      : "text-[#1C1C1E]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5EA] rounded-xl text-sm font-medium text-[#1C1C1E] hover:bg-[#F2F2F7] transition-colors">
            <ArrowUpDown size={16} className="text-[#8E8E93]" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#E5E5EA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9F9F9] border-b border-[#E5E5EA]">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[25%]">
                  Event
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[20%]">
                  Case
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[20%]">
                  Date & Time
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-[#8E8E93] uppercase w-[15%]">
                  Type
                </th>
                <th className="py-4 px-6 text-right w-[5%]"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E5EA]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#8E8E93]">
                    Loading events...
                  </td>
                </tr>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-[#F2F2F7] transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mt-0.5">
                          <CalendarIcon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1C1C1E] group-hover:text-orange-700">
                            {item.title}
                          </p>
                          <p className="text-xs text-[#8E8E93] mt-0.5">
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-[#8E8E93]" />
                        <span className="text-sm text-[#1C1C1E]">
                          {item.case.case_title}
                        </span>
                      </div>
                      <p className="text-xs text-[#8E8E93] font-mono">
                        {item.case.case_number}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-sm text-[#1C1C1E]">
                        {formatDateTime(item.start_time)}
                      </p>
                      <p className="text-xs text-[#8E8E93]">
                        to {formatDateTime(item.end_time)}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getEventTypeStyle(
                          item.event_type
                        )}`}
                      >
                        {item.event_type}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button className="p-2 text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-white rounded-lg opacity-0 group-hover:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#8E8E93]">
                    No events found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-[#E5E5EA]">
          <span className="text-xs text-[#8E8E93]">
            Showing <strong>{filteredEvents.length}</strong> of{" "}
            <strong>{events.length}</strong> events
          </span>
          <div className="flex gap-2">
            <ChevronLeft size={16} />
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarListPage;
