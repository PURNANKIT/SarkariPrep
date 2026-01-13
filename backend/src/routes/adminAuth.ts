import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { randomBytes } from "crypto";
import { sendAdminVerificationEmail } from "../routes/emailServices.js";
import { sendAdminResetPasswordEmail } from "../routes/emailServices.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET as string;

/* ===========================
   ✅ ADMIN SIGNUP (WITH EMAIL VERIFICATION)
=========================== */
router.post("/admin/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // ✅ Strong Password Validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters with uppercase, lowercase, number & special character",
      });
    }

    // ✅ Check admin exists
    const exists = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (exists.rows.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists" });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE VERIFICATION TOKEN
    const verificationToken = randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const result = await pool.query(
      `INSERT INTO admins (name, email, password, is_verified, verification_token, verification_expires)
       VALUES ($1, $2, $3, false, $4, $5)
       RETURNING id, name, email`,
      [name, email, hashedPassword, verificationToken, expiresAt]
    );

    // ✅ ✅ ✅ ✅ ✅ FIXED LINE (ADMIN EMAIL JAAYEGA)
    await sendAdminVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Admin signup successful. Please verify your email.",
      admin: result.rows[0],
    });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===========================
   ✅ ADMIN EMAIL VERIFY
=========================== */
router.get("/admin/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    const result = await pool.query(
      "SELECT * FROM admins WHERE verification_token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      return res.send("<h2>Invalid or expired admin verification token</h2>");
    }

    const admin = result.rows[0];

    if (new Date() > new Date(admin.verification_expires)) {
      return res.send("<h2>Verification link expired</h2>");
    }

    await pool.query(
      `UPDATE admins 
       SET is_verified = true, verification_token = NULL, verification_expires = NULL 
       WHERE id = $1`,
      [admin.id]
    );

    return res.send(`
      <h1>✅ Admin Email Verified Successfully</h1>
      <p>You can now login to admin panel.</p>
    `);
  } catch (err) {
    console.error("Admin verify error:", err);
    return res.status(500).send("Server error");
  }
});

/* ===========================
   ✅ ADMIN LOGIN (ONLY IF VERIFIED)
=========================== */

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const admin = result.rows[0];

    // ✅ ✅ ✅ BLOCK LOGIN + AUTO EMAIL RESEND
    if (!admin.is_verified) {
      // ✅ Generate NEW token
      const newToken = randomBytes(40).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      // ✅ Update token in DB
      await pool.query(
        "UPDATE admins SET verification_token = $1, verification_expires = $2 WHERE id = $3",
        [newToken, expiresAt, admin.id]
      );

      // ✅ Send verification email again
      await sendAdminVerificationEmail(admin.email, newToken);

      return res.status(403).json({
        success: false,
        message:
          "Admin email not verified. A new verification link has been sent to your email.",
      });
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===========================
   ✅ ADMIN FORGOT PASSWORD (SEND RESET LINK)
=========================== */
router.post("/admin/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const result = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const admin = result.rows[0];

    const resetToken = randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await pool.query(
      `UPDATE admins 
       SET reset_token = $1, reset_expires = $2 
       WHERE id = $3`,
      [resetToken, expiresAt, admin.id]
    );

    const resetLink = `http://localhost:5174/admin/reset-password?token=${resetToken}`;

    await sendAdminResetPasswordEmail(admin.email, resetLink);

    res.json({
      success: true,
      message: "Admin reset password link sent to your email",
    });
  } catch (error) {
    console.error("Admin forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===========================
   ✅ ADMIN RESET PASSWORD (FINAL STEP)
=========================== */
router.post("/admin/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Strong password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters with uppercase, lowercase, number & special character",
      });
    }

    const result = await pool.query(
      "SELECT * FROM admins WHERE reset_token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const admin = result.rows[0];

    if (new Date() > new Date(admin.reset_expires)) {
      return res
        .status(400)
        .json({ success: false, message: "Reset link expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE admins 
       SET password = $1, reset_token = NULL, reset_expires = NULL
       WHERE id = $2`,
      [hashedPassword, admin.id]
    );

    res.json({
      success: true,
      message: "Admin password reset successful",
    });
  } catch (err) {
    console.error("Admin reset password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
