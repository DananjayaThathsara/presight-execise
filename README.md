# Presight Frontend Exercise

A full-stack application built with React and Node.js demonstrating three advanced frontend concepts.

## Tech Stack

**Client** — React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, TanStack Virtual, Socket.io Client

**Server** — Node.js, Express, TypeScript, Socket.io, Worker Threads, Faker.js

## How to Run

**Step 1 — Install dependencies**
```bash
npm install
```

**Step 2 — Start the server (Terminal 1)**
```bash
cd server
npm start
```

**Step 3 — Start the client (Terminal 2)**
```bash
cd client
npm run dev
```

**Step 4 — Open browser**
```
http://localhost:5173
```

## Tasks

**Task 1 — People List**
Paginated API with search and filters. Virtual scroll renders only visible cards. Infinite scroll loads more as you scroll down.

**Task 2 — HTTP Streaming**
Server streams text in chunks. Client reads and displays it one character at a time. Full response shown when stream ends.

**Task 3 — WebSocket Jobs**
20 jobs sent to server. Each returns pending immediately. Worker thread processes jobs in background. Results arrive via WebSocket in real time.