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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", userRoutes);

// Practice API route
app.use("/api/practice", practiceRoutes);

// Syllabus API route
app.use("/api/syllabus", syllabusRoutes);

app.use("/", authRoute);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})
.catch((err) => console.error("❌ DB Error:", err));
