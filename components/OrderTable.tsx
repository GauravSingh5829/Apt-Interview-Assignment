import { Order } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/constants";

function getInitials(name: string) {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function OrderTable({ filteredOrders }: { filteredOrders: Order[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-red-950/40 bg-[#0d0d12] shadow-xl shadow-black/60">
      <table className="min-w-full divide-y divide-red-950/40">
        <thead className="bg-black/80">
          <tr>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Order ID</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Customer</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Product</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Lifecycle Status</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Last System Update</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900/60">
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-sm font-medium text-zinc-500 italic">
                No records actively match the current view criteria.
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-red-950/10 transition-colors group">
                <td className="px-5 py-3.5 whitespace-nowrap text-xs font-mono text-red-400 font-semibold">#{order.id}</td>
                <td className="px-5 py-3.5 whitespace-nowrap text-sm font-semibold text-zinc-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-red-950/80 border border-red-900/50 flex items-center justify-center text-[11px] font-extrabold text-red-400 shadow-inner select-none">
                      {getInitials(order.customer_name)}
                    </div>
                    <span>{order.customer_name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-sm text-zinc-400">{order.product_name}</td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${STATUS_COLORS[order.status] || "bg-zinc-800 text-zinc-400"}`}>
                      {order.status}
                    </span>
                    {/* Status Step Indicators */}
                    <div className="hidden sm:flex items-center gap-1 opacity-70">
                      <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'pending' || order.status === 'shipped' || order.status === 'delivered' ? 'bg-amber-400' : 'bg-zinc-800'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'shipped' || order.status === 'delivered' ? 'bg-rose-400' : 'bg-zinc-800'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'delivered' ? 'bg-emerald-400' : 'bg-zinc-800'}`} />
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">{order.updated_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
