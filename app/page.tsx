"use client";

import { useState, useMemo } from "react";
import { toast, Toaster } from "sonner";
import { Loader2, Radio, Activity, Volume2, VolumeX } from "lucide-react";

import { useOrdersWebSocket } from "@/hooks/useOrdersWebSocket";
import { MetricsBoard } from "@/components/Metrics";
import { FilterControls } from "@/components/Filter";
import { OrderTable } from "@/components/OrderTable";
import { AuditConsole } from "@/components/Audit";
import Chart from "@/components/Chart";

export default function Dashboard() {
  const {
    orders,
    auditLogs,
    chartHistory,
    isConnected,
    eventCount,
    loading,
    isMuted,
    setIsMuted,
  } = useOrdersWebSocket();

  // Local UI State
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isGraphExpanded, setIsGraphExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeQuery, setTimeQuery] = useState("");

  // Centralized Aggregate Reduction Metrics Engine
  const metrics = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  // Compute Active Search Matrix Selection Subsets
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = activeFilter === "all" || order.status === activeFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        order.id.toString().includes(searchLower) ||
        order.customer_name.toLowerCase().includes(searchLower) ||
        order.product_name.toLowerCase().includes(searchLower);

      const matchesTime = (order.updated_at || "").toLowerCase().includes(timeQuery.toLowerCase());
      return matchesStatus && matchesSearch && matchesTime;
    });
  }, [orders, activeFilter, searchQuery, timeQuery]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    toast(`Switched view criteria`, {
      description: `Showing orders matching: ${filter.toUpperCase()}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 antialiased selection:bg-red-500 selection:text-white">
      {/* Top Header / Navigation Bar */}
      <header className="w-full bg-[#09090d] border-b border-red-950/60 px-6 py-4 shadow-xl shadow-black/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-bold text-base shadow-md shadow-red-600/30">
              ⚡
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-zinc-100 tracking-tight">Order Dashboard</h1>
              <p className="text-xs text-zinc-400 font-medium">Real-Time Database Change Propagation Engine</p>
            </div>
          </div>

          {/* Center Title & Author Attribution */}
          <div className="text-center bg-black/60 px-5 py-1.5 rounded-xl border border-red-950/60 shadow-inner self-center">
            <h2 className="text-sm font-extrabold text-white tracking-wider uppercase">Apt Interview Assignment</h2>
            <p className="text-[11px] font-semibold text-red-400">Made by Gaurav Kumar Singh</p>
          </div>

          {/* Prominent Unblocked Status Pill & Controls */}
          <div className="flex items-center gap-3 text-xs font-semibold text-zinc-300 bg-black/90 px-4 py-2 rounded-xl border border-red-950/80 shadow-lg shadow-black/80 self-start md:self-auto">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-red-500" />
              <span>Events Handled: <span className="font-mono font-extrabold text-white text-sm">{eventCount}</span></span>
            </div>
            <div className="h-4 w-[1px] bg-red-950" />
            <div className="flex items-center gap-2">
              <Radio size={15} className={isConnected ? "text-emerald-400 animate-pulse" : "text-red-500"} />
              <span className={`font-bold uppercase tracking-wider text-xs ${isConnected ? "text-emerald-400" : "text-red-500 animate-pulse"}`}>
                {isConnected ? "● Connected" : "● Offline / Reconnecting"}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-red-950" />
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Live Chimes" : "Mute Live Chimes"}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} className="text-emerald-400" />}
              <span className="text-[10px] font-bold uppercase tracking-wider">{isMuted ? "Muted" : "Audio On"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Command Center Layout */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {loading ? (
          <div className="mt-20 flex flex-col items-center gap-3 bg-[#0d0d12] p-12 rounded-xl border border-red-950/60 max-w-md mx-auto shadow-2xl text-center">
            <Loader2 className="animate-spin text-red-500" size={40} />
            <p className="text-sm font-semibold text-zinc-400">Connecting to real-time data systems...</p>
          </div>
        ) : (
          <>
            {/* Top Full-Width Hero Summary Strip */}
            <MetricsBoard metrics={metrics} />

            {/* 3-Column Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (3/12): Control & Filters */}
              <div className="lg:col-span-3">
                <FilterControls
                  searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                  timeQuery={timeQuery} setTimeQuery={setTimeQuery}
                  activeFilter={activeFilter} handleFilterChange={handleFilterChange}
                />
              </div>

              {/* Center Stage (5/12): Live Orders Table */}
              <div className="lg:col-span-5">
                <OrderTable filteredOrders={filteredOrders} />
              </div>

              {/* Right Column (4/12): Analytics & Audit Feed */}
              <div className="lg:col-span-4 space-y-6">
                <Chart
                  chartHistory={chartHistory}
                  isExpanded={isGraphExpanded}
                  onToggle={() => setIsGraphExpanded(!isGraphExpanded)}
                />

                <AuditConsole auditLogs={auditLogs} />
              </div>
            </div>
          </>
        )}
      </main>

      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}