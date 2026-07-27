export function MetricsBoard({ metrics }: { metrics: { total: number; pending: number; shipped: number; delivered: number } }) {
  const layout = [
    { label: "Total Orders", val: metrics.total, textColor: "text-red-500", badgeColor: "bg-red-950/60 text-red-400 border border-red-900/40" },
    { label: "Pending Pool", val: metrics.pending, textColor: "text-amber-400", badgeColor: "bg-amber-950/60 text-amber-400 border border-amber-900/40" },
    { label: "In Transit", val: metrics.shipped, textColor: "text-rose-400", badgeColor: "bg-rose-950/60 text-rose-400 border border-rose-900/40" },
    { label: "Delivered Ledger", val: metrics.delivered, textColor: "text-emerald-400", badgeColor: "bg-emerald-950/60 text-emerald-400 border border-emerald-900/40" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
      {layout.map((card, idx) => (
        <div key={idx} className="bg-[#0d0d12] p-5 rounded-xl border border-red-950/40 hover:border-red-800/60 shadow-lg shadow-black/60 transition-all duration-200">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{card.label}</p>
            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${card.badgeColor}`}>LIVE</span>
          </div>
          <p className={`text-3xl font-extrabold mt-3 font-mono tracking-tight ${card.textColor}`}>{card.val}</p>
        </div>
      ))}
    </div>
  );
}
