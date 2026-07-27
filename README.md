# ⚡ Real-Time CDC Order Dashboard & Change Propagation Engine

> An enterprise-grade, event-driven trading & order management dashboard powered by a **PostgreSQL Change Data Capture (CDC) pipeline** and real-time **WebSocket streaming**. Built for the Apt Interview Assignment by **Gaurav Kumar Singh**.

---

## 🌟 Executive Overview

This application demonstrates a zero-polling, highly reactive system architecture where an embedded PostgreSQL instance acts as the single source of truth. Every order mutation (`INSERT`, `UPDATE`, `DELETE`) is captured at the database layer via **PL/pgSQL triggers**, broadcast asynchronously over native PostgreSQL `LISTEN/NOTIFY` channels, and passively relayed to the frontend dashboard via **WebSockets**.

### 🎯 Key Engineering Highlights

- **True Row-Level CDC**: Zero polling overhead. Mutations trigger native database notifications instantly upon SQL execution.
- **Passive Relaying Gateway**: The backend server acts strictly as a gateway — it never fabricates mock events on the application layer; every state update originates from PostgreSQL.
- **3-Column Command Center Dashboard**: A custom layout featuring a dedicated Left Control Sidebar, Center Live Stage Grid, and Right Analytics & Audit Feed.
- **Real-Time Trend Charting**: High-frequency telemetry visualization built with Recharts, tracking live velocity across order lifecycle states.
- **Web Audio Sound Synthesizer**: Native Web Audio API sound chimes providing auditory cues on state updates with an in-header Audio Mute/Unmute control.
- **Audit Log JSON Exporter**: Client-side utility allowing engineers to download live CDC transaction logs as structured `.json` files.
- **Database Reset CLI Tooling**: Automated reset scripts (`npm run dev:reset`) to purge persistent PostgreSQL state back to 0 orders on demand.

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       simulator.js (Node.js Engine)                         │
│                                                                             │
│  ┌───────────────────────────┐         ┌─────────────────────────────────┐  │
│  │   Embedded PostgreSQL     │         │   Order Lifecycle Simulator     │  │
│  │   (embedded-postgres)     │◄────────│   INSERT / UPDATE / DELETE      │  │
│  │   Port: 54321             │         │   1.5s - 3s jittered intervals  │  │
│  └─────────────┬─────────────┘         └─────────────────────────────────┘  │
│                │                                                            │
│                │ PL/pgSQL Trigger: notify_order_mutation()                 │
│                ▼                                                            │
│  ┌───────────────────────────┐                                              │
│  │   pg_notify('order_updates')                                              │
│  └─────────────┬─────────────┘                                              │
│                │                                                            │
│                │ LISTEN order_updates (pg.Client)                           │
│                ▼                                                            │
│  ┌───────────────────────────┐                                              │
│  │   WebSocket Gateway       │                                              │
│  │   ws://localhost:8080/ws  │                                              │
│  └─────────────┬─────────────┘                                              │
└────────────────┼────────────────────────────────────────────────────────────┘
                 │
                 │ JSON Event Stream (Initial Snapshot + Live Deltas)
                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Next.js 16 Dashboard                               │
│                                                                             │
│  ┌────────────────────┐   ┌────────────────────┐   ┌─────────────────────┐  │
│  │  Metrics & Filter  │   │  Live Orders Grid  │   │  Recharts & Audit   │  │
│  │  Sidebar Panel     │   │  Center Stage      │   │  Console Feed       │  │
│  └────────────────────┘   └────────────────────┘   └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start (Local Setup)

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### 2. Installation
Clone the repository and install all dependencies:

```bash
git clone https://github.com/GauravSingh5829/Apt-Interview-Assignment.git
cd Apt-Interview-Assignment
npm install
```

### 3. Running the Application

To run the complete CDC pipeline (Next.js Dashboard + Embedded PostgreSQL + WebSocket Server) concurrently:

```bash
# Standard Launch (Preserves existing database state)
npm run dev:all

# Clean Slate Launch (Truncates PostgreSQL table back to 0 orders on boot)
npm run dev:reset
```

Once ignited, access the services at:
- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **WebSocket Gateway**: `ws://localhost:8080/ws`
- **Embedded PostgreSQL**: `localhost:54321`

---

## 📜 Available CLI Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev:all` | Boots Next.js frontend and PostgreSQL CDC simulator concurrently |
| `npm run dev:reset` | Boots Next.js frontend and CDC simulator with an immediate DB reset to 0 orders |
| `npm run db:reset` | Truncates PostgreSQL `orders` table back to 0 items |
| `npm run dev` | Launches Next.js development server only |
| `npm run build` | Compiles production Next.js build |
| `npm run start` | Ignites production Next.js server |
| `npm run lint` | Runs ESLint analysis across the repository |

---

## 🌐 Production Deployment Guide

### Phase 1: Deploy Backend Gateway to Render
1. Create a new **Web Service** on [Render](https://render.com) connected to this repository.
2. Build Command: `npm install`
3. Start Command: `node simulator.js`
4. Copy the assigned URL (e.g., `apt-backend.onrender.com`).
5. Your production WebSocket URL will be: `wss://apt-backend.onrender.com`

### Phase 2: Deploy Frontend to Vercel
1. Import this repository into [Vercel](https://vercel.com).
2. Configure Environment Variable:
   - **Key**: `NEXT_PUBLIC_WS_URL`
   - **Value**: `wss://apt-backend.onrender.com` *(from Phase 1)*
3. Click **Deploy**.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router) + React 19 | Server & Client component rendering |
| **Styling System** | Tailwind CSS 4 | Custom dark glassmorphism theme & utility styling |
| **State & Data Stream** | WebSockets (`ws`) + React Hooks | Bi-directional streaming & snapshot management |
| **Database Engine** | Embedded PostgreSQL (`embedded-postgres`) | Zero-config relational database server |
| **CDC Trigger Mechanism**| PL/pgSQL + `LISTEN/NOTIFY` | Row-level mutation capture |
| **Data Visualization** | Recharts | Real-time analytics line graphs |
| **Notifications & Audio**| Sonner + Web Audio API (`AudioContext`) | Toast popups and auditory feedback chimes |

---

## 👤 Author & Maintainer

**Gaurav Kumar Singh**  
- **GitHub**: [@GauravSingh5829](https://github.com/GauravSingh5829)  
- **Project**: Apt Interview Assignment — Real-Time CDC Order Dashboard
