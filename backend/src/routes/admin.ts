import { Router } from "express";
import pool from "../db.js";

const router = Router();

// ✅ TOTAL USERS
router.get("/admin/total-users", async (req, res) => {
  const result = await pool.query("SELECT COUNT(*) FROM users");
  res.json({ success: true, total: Number(result.rows[0].count) });
});

// ✅ VERIFIED USERS
router.get("/admin/verified-users", async (req, res) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM users WHERE is_verified = true"
  );
  res.json({ success: true, verified: Number(result.rows[0].count) });
});

// =========================
// ✅ ADMIN ONLINE USER COUNT (BOTH COPIES KEPT)
// =========================
router.get("/admin/online-users", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) FROM users WHERE is_online = true`
    );

    res.json({
      success: true,
      onlineUsers: Number(result.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch online users",
    });
  }
});

export default router;
