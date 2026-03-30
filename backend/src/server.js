import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();
const __dirname = path.resolve();

// ✅ Middleware
app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL, // ⚠️ make sure this is your Vercel URL
    credentials: true,
  })
);

app.use(clerkMiddleware());

// ✅ Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// ✅ Health check
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is up and running 🚀" });
});

// ✅ Root route (important for testing)
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ Serve frontend (only in production)
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // ❗ FIXED (important)
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

// ✅ Start server (FIXED PORT)
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || ENV.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();