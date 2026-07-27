import { Search, Clock } from "lucide-react";

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  timeQuery: string;
  setTimeQuery: (v: string) => void;
  activeFilter: string;
  handleFilterChange: (v: string) => void;
}

export function FilterControls({
  searchQuery,
  setSearchQuery,
  timeQuery,
  setTimeQuery,
  activeFilter,
  handleFilterChange,
}: FilterControlsProps) {
  return (
    <div className="w-full bg-[#0d0d12] p-5 rounded-xl border border-red-950/40 shadow-xl shadow-black/60 space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2 border-b border-red-950/40 pb-3">
        <Search size={14} className="text-red-500" />
        Filter & Search Panel
      </h3>

      {/* Status Filter Buttons - Vertical Stack */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Order Status</label>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
          {["all", "pending", "shipped", "delivered"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`w-full rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-left transition-all ${
                activeFilter === status 
                  ? "bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-500/50" 
                  : "bg-black/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-red-950"
              }`}
            >
              • {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3 pt-2 border-t border-red-950/40">
        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search ID, customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-black/80 border border-red-950/60 rounded-lg text-xs focus:outline-none focus:border-red-600 text-zinc-100 placeholder-zinc-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Time Window</label>
          <div className="relative">
            <Clock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Filter by time..."
              value={timeQuery}
              onChange={(e) => setTimeQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-black/80 border border-red-950/60 rounded-lg text-xs focus:outline-none focus:border-red-600 text-zinc-100 placeholder-zinc-500 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
