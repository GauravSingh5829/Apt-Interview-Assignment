import { Order } from "./types";

export const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-amber-950/40 text-amber-400 border border-amber-800/50 shadow-xs",
  shipped: "bg-red-950/50 text-red-400 border border-red-800/50 shadow-xs",
  delivered: "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 shadow-xs",
};

const LOCAL_WS_URL = "ws://localhost:8080/ws";

const isLocalBrowser =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const WS_URL = isLocalBrowser
  ? LOCAL_WS_URL
  : process.env.NEXT_PUBLIC_WS_URL || LOCAL_WS_URL;

export const TOAST_DISCONNECT_ID = "ws-disconnect-alert-id";
