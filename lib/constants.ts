import { Order } from "./types";

export const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-amber-950/40 text-amber-400 border border-amber-800/50 shadow-xs",
  shipped: "bg-red-950/50 text-red-400 border border-red-800/50 shadow-xs",
  delivered: "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 shadow-xs",
};

function formatWsUrl(rawUrl?: string): string {
  if (!rawUrl) return LOCAL_WS_URL;
  let formatted = rawUrl.trim();
  if (formatted.startsWith("https://")) {
    formatted = formatted.replace("https://", "wss://");
  } else if (formatted.startsWith("http://")) {
    formatted = formatted.replace("http://", "ws://");
  } else if (!formatted.startsWith("ws://") && !formatted.startsWith("wss://")) {
    formatted = `wss://${formatted}`;
  }
  if (!formatted.endsWith("/ws")) {
    formatted = `${formatted.replace(/\/$/, "")}/ws`;
  }
  return formatted;
}

export const WS_URL = formatWsUrl(process.env.NEXT_PUBLIC_WS_URL);

export const TOAST_DISCONNECT_ID = "ws-disconnect-alert-id";
