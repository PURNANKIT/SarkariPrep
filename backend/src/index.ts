import express, { type Request, type Response } from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import userRoutes from "./user.js";
import { connectDB } from "./db.js";
import practiceRoutes from "./routes/Practice.js";
import syllabusRoutes from "./Syllabus/Syllabus.js";
import authRoute from "./routes/auth.js";
import pyqRoutes from "./routes/pyq.js";
import notificationRoutes from "./routes/notification.js";
import adminRoutes from "./routes/admin.js";
import adminAuthRoutes from "./routes/adminAuth.js"

dotenv.config();

const app = express();

// ✅ UPDATED CORS WITH ADMIN PANEL ORIGIN
app.use(
  cors({
    origin: [
      
      "http://localhost:5173", // frontend
      "http://localhost:5174", // admin panel local
      "https://jasper-unaffixed-denisha.ngrok-free.dev", // froward ngrok
    ],
      
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", chatRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", userRoutes);

// Practice API route
app.use("/api/practice", practiceRoutes);

// Syllabus API route
app.use("/api/syllabus", syllabusRoutes);

app.use("/", authRoute);
app.use("/api/pyq", pyqRoutes);

// Notification API
app.use("/api/notifications", notificationRoutes);
app.use("/", adminRoutes);
app.use("/", adminAuthRoutes);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Error:", err));
