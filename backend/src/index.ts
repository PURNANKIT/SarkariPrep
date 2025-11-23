import path from "path";
import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./user.js";
import { connectDB } from "./db.js";
import practiceRoutes from "./routes/Practice.js";
import syllabusRoutes from "./Syllabus/Syllabus.js";
import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// --- API routes ---
app.use("/", userRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/", authRoute);

// --- Serve React frontend in production ---
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "client/build")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(path.resolve(), "client/build", "index.html"));
  });
}

// --- Root route for testing ---
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
