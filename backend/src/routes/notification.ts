import { Router, type Request, type Response } from "express";
import pool from "../db.js";

const router = Router();

/* =========================================================
   ✅ SEND NOTIFICATION (ADMIN → USER / ALL)
========================================================= */
router.post("/send", async (req: Request, res: Response) => {
  try {
    const { title, message, type = "info", user_id = "all" } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        error: "Title and message are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO notifications (title, message, user_id, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [title, message, user_id, type]
    );

    res.json({
      success: true,
      message:
        user_id === "all"
          ? "Notification sent to all users"
          : `Notification sent to user ${user_id}`,
      notification: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send notification",
    });
  }
});

/* =========================================================
   ✅ GET USER NOTIFICATIONS (USER + ALL + NULL SAFE)
========================================================= */
router.get("/user/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id as string;

    let query = "";
    let params: string[] = [];

    if (user_id === "all") {
      query = `
        SELECT * FROM notifications
        ORDER BY created_at DESC
        LIMIT 50
      `;
    } else {
      query = `
        SELECT * FROM notifications 
        WHERE user_id = $1
           OR user_id = 'all'
           OR user_id IS NULL
        ORDER BY created_at DESC
      `;
      params = [user_id];
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      notifications: result.rows,
    });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch notifications",
    });
  }
});

/* =========================================================
   ✅ MARK NOTIFICATION AS READ (NO DUPLICATE USER IDS)
========================================================= */
router.put("/:id/read", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    const result = await pool.query(
      `
      UPDATE notifications 
      SET read_by = (
        SELECT ARRAY(
          SELECT DISTINCT e FROM unnest(
            array_append(COALESCE(read_by, ARRAY[]::text[]), $1)
          ) e
        )
      )
      WHERE id = $2
      RETURNING *
      `,
      [user_id.toString(), id]
    );

    res.json({
      success: true,
      message: "Notification marked as read",
      notification: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error marking notification as read:", error);
    res.status(500).json({
      success: false,
      error: "Failed to mark notification as read",
    });
  }
});

/* =========================================================
   ✅ NOTIFICATION STATS (TOTAL + UNREAD SAFE COUNT)
========================================================= */
router.get("/stats", async (req: Request, res: Response) => {
  try {
    const user_id = String(req.query.user_id ?? "0");

    const totalResult = await pool.query(`SELECT COUNT(*) FROM notifications`);

    const unreadResult = await pool.query(
      `
      SELECT COUNT(*) 
      FROM notifications 
      WHERE NOT ($1 = ANY(COALESCE(read_by, ARRAY[]::text[])))
      `,
      [user_id]
    );

    res.json({
      success: true,
      stats: {
        total: Number(totalResult.rows[0].count),
        unread: Number(unreadResult.rows[0].count),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});

export default router;
