import { History, Download } from "lucide-react";
import { AuditLog } from "@/lib/types";

export function AuditConsole({ auditLogs }: { auditLogs: AuditLog[] }) {
  const exportLogs = () => {
    if (auditLogs.length === 0) return;
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cdc-audit-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0d0d12] rounded-xl p-5 border border-red-950/40 shadow-xl shadow-black/60">
      <div className="flex items-center justify-between border-b border-red-950/40 pb-3 mb-3">
        <h3 className="text-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <History size={14} className="text-red-500" />
          Autonomous Audit Log Feed
        </h3>

        <button
          onClick={exportLogs}
          disabled={auditLogs.length === 0}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 hover:bg-red-950/60 text-zinc-300 hover:text-white border border-red-950/80 transition-all disabled:opacity-40 disabled:pointer-events-none"
        >
          <Download size={12} className="text-red-500" />
          Export JSON
        </button>
      </div>

      <div className="h-48 overflow-y-auto font-mono text-xs space-y-2 text-left [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {auditLogs.length === 0 ? (
          <p className="text-zinc-500 italic py-4">Awaiting WebSocket streaming updates pipeline activation...</p>
        ) : (
          auditLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-zinc-300 hover:bg-red-950/10 p-1.5 rounded-md transition-colors border border-transparent hover:border-red-950/40">
              <span className="text-zinc-500 select-none text-[11px]">[{log.timestamp}]</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] uppercase ${
                log.type === "INSERT" ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800/40" :
                log.type === "UPDATE" ? "text-rose-400 bg-rose-950/60 border border-rose-800/40" : 
                "text-red-400 bg-red-950/60 border border-red-800/40"
              }`}>
                {log.type}
              </span>
              <span className="text-zinc-200 break-all text-[11px] leading-tight">{log.details}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
