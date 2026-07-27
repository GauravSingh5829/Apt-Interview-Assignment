"use client";
import { useState, useEffect } from "react";
import { LineChart as ChartIcon, ChevronDown, ChevronUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { HistoricalSnapshot } from "../lib/types";

interface ChartProps {
    chartHistory: HistoricalSnapshot[];
    isExpanded: boolean;
    onToggle: () => void;
}

export default function Chart({ chartHistory, isExpanded, onToggle }: ChartProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <section className="w-full bg-[#0d0d12] border border-red-950/40 rounded-xl p-5 mb-6 shadow-xl shadow-black/60">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between focus:outline-none group text-left"
                aria-expanded={isExpanded}
            >
                <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2 group-hover:text-red-400 transition-colors">
                    <ChartIcon size={15} className="text-red-500" />
                    Real-Time Activity Monitor
                </h2>
                <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </button>

            <div
                className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "mt-4 opacity-100 h-64" : "h-0 opacity-0 pointer-events-none"
                }`}
                aria-hidden={!isExpanded}
            >
                {hasMounted && chartHistory.length > 0 ? (
                    <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartHistory} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a0a0a" />
                                <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} />
                                <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#09090b", borderRadius: "10px", border: "1px solid #450a0a", color: "#f4f4f5", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.8)" }}
                                    labelStyle={{ color: "#a1a1aa", fontSize: "11px", fontWeight: "bold" }}
                                    itemStyle={{ fontSize: "12px", padding: "2px 0" }}
                                />
                                <Line type="monotone" dataKey="Total Orders" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4, fill: "#ef4444" }} activeDot={{ r: 6 }} isAnimationActive={false} />
                                <Line type="monotone" dataKey="Pending Pool" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3.5, fill: "#f59e0b" }} activeDot={{ r: 5 }} isAnimationActive={false} />
                                <Line type="monotone" dataKey="In Transit" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3.5, fill: "#f43f5e" }} activeDot={{ r: 5 }} isAnimationActive={false} />
                                <Line type="monotone" dataKey="Delivered Ledger" stroke="#10b981" strokeWidth={2} dot={{ r: 3.5, fill: "#10b981" }} activeDot={{ r: 5 }} isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="w-full h-64 flex items-center justify-center border border-dashed border-red-950/40 rounded-lg bg-black/40">
                        <p className="text-xs text-zinc-500 italic">Gathering operational trace points for trend tracking...</p>
                    </div>
                )}
            </div>
        </section>
    );
}