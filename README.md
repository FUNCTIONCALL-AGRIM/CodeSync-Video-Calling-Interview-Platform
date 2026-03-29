# CodeSync — Code Together, Grow Together

A real-time collaborative coding platform built for pair programming and technical interviews with live video, chat, and multi-language code execution.

---

## ✨ Features

- 🧑‍💻 **VSCode-Powered Code Editor** — Monaco editor with syntax highlighting
- 🔐 **Authentication** — Secure login and user management via Clerk
- 🎥 **1-on-1 Video Interview Rooms** — HD real-time video powered by Stream
- 🧭 **Dashboard with Live Stats** — Track active and past sessions
- 🔊 **Mic, Camera, Screen Sharing & Recording** — Full media controls
- 💬 **Real-time Chat Messaging** — In-session chat so you never lose context
- ⚙️ **Secure Code Execution** — Run code in an isolated environment
- 🎯 **Auto Feedback** — Success / Fail results based on test cases
- 🎉 **Confetti on Success** — Notifications on failure
- 🧩 **Practice Problems Page** — Solo coding mode with curated challenges
- 🔒 **Room Locking** — Max 2 participants per session
- 🧠 **Background Jobs** — Async tasks powered by Inngest
- 🧰 **REST API** — Built with Node.js & Express
- ⚡ **Data Fetching & Caching** — Via TanStack Query
- 🤖 **CodeRabbit Integration** — PR analysis & code optimization
- 🧑‍💻 **Git & GitHub Workflow** — Branches, PRs, and merges
- 🚀 **Deployment Ready** — Deployable on Sevalla (free-tier friendly)

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, TailwindCSS, DaisyUI, Monaco Editor, Stream Video SDK, TanStack Query

**Backend:** Node.js, Express, MongoDB, Mongoose, Clerk, Stream, Inngest

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/FUNCTIONCALL-AGRIM/CodeSync-Video-Calling-Interview-Platform.git
cd CodeSync-Video-Calling-Interview-Platform
```

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Environment Variables

### Backend `/backend/.env`

```bash
PORT=3000
NODE_ENV=development
DB_URL=your_mongodb_connection_url
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend `/frontend/.env`

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🌐 Local URLs

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |

---

## 📦 Accounts You'll Need

| Service | Purpose | Link |
|---------|---------|------|
| Clerk | Authentication | [clerk.com](https://clerk.com) |
| MongoDB Atlas | Database | [mongodb.com](https://mongodb.com) |
| Stream | Video + Chat | [getstream.io](https://getstream.io) |
| Inngest | Background Jobs | [inngest.com](https://inngest.com) |
