import express from "express";
import { prisma } from "./lib/prisma";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);

    if (err.code === "P2002") {
      return res.status(409).json({ error: "Unique constraint violation" });
    }

    if (err.code === "P2025") {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(500).json({ error: err.message || "Internal server error" });
  }
);

// // Start server
// app.listen(PORT, () => {
//   console.log(`✓ Server running on http://localhost:${PORT}`);
//   console.log(`✓ API endpoints:`);
//   console.log(`  - GET    http://localhost:${PORT}/api/users`);
//   console.log(`  - POST   http://localhost:${PORT}/api/users`);
//   console.log(`  - GET    http://localhost:${PORT}/api/users/:id`);
//   console.log(`  - PUT    http://localhost:${PORT}/api/users/:id`);
//   console.log(`  - DELETE http://localhost:${PORT}/api/users/:id`);
//   console.log(`  - GET    http://localhost:${PORT}/api/posts`);
//   console.log(`  - POST   http://localhost:${PORT}/api/posts`);
//   console.log(`  - GET    http://localhost:${PORT}/api/posts/:id`);
//   console.log(`  - PUT    http://localhost:${PORT}/api/posts/:id`);
//   console.log(`  - DELETE http://localhost:${PORT}/api/posts/:id`);
// });

// // Graceful shutdown
// process.on("SIGINT", async () => {
//   console.log("\nShutting down...");
//   await prisma.$disconnect();
//   process.exit(0);
// });

// Start server
const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown");
    process.exit(1);
  }, 10000);
});