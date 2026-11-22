const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { setupSocket } = require("./config/socket");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());

app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ limit: "8mb", extended: true }));

// =========================
// API Routes
// =========================

app.use("/api/share", require("./routes/shareRoutes"));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// =========================
// Serve React Frontend
// =========================

app.use(express.static(path.join(__dirname, "dist")));

// React Router fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// =========================
// WebSocket
// =========================

setupSocket(server);

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
