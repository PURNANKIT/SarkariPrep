import express from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "./db.js";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "./routes/emailServices.js";
import { randomBytes } from "crypto";

interface MyJWT extends JwtPayload {
  id: number;
  email: string;
}

const router = express.Router();

// ✅ ✅ ✅ ENV TYPES COMPLETELY FIXED
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as any; // ✅ STRONG FIX FOR TS OVERLOAD

// =========================
// ✅ SIGNUP
// =========================
router.post("/signup", async (req, res) => {
  try {
    const {
      full_name,
      email,
      mobile,
      job_preparation,
      preparation_year,
      password,
    } = req.body;

    if (
      !full_name ||
      !email ||
      !mobile ||
      !job_preparation ||
      !preparation_year ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile number must be exactly 10 digits." });
    }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0)
      return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const newUser = await pool.query(
      `INSERT INTO users 
       (full_name, email, mobile, job_preparation, preparation_year, password, verification_token, verification_expires, is_verified)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,false)
       RETURNING id, full_name, email`,
      [
        full_name,
        email,
        mobile,
        job_preparation,
        preparation_year,
        hashedPassword,
        verificationToken,
        expiresAt,
      ]
    );

    const user = newUser.rows[0];
    await sendVerificationEmail(email, verificationToken);

    // ✅ ✅ ✅ JWT SIGN — TS OVERLOAD SAFE
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(201).json({
      message: "Signup successful. Please verify your email.",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// =========================
// ✅ LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email first.",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // ✅ MARK USER ONLINE
    await pool.query(
      `
      UPDATE users 
      SET is_online = true, last_seen = NOW() 
      WHERE id = $1
      `,
      [user.id]
    );

    // ✅ ✅ ✅ JWT SIGN — TS OVERLOAD SAFE
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =========================
// ✅ LOGOUT (BOTH COPIES KEPT AS-IS)
// =========================
router.post("/logout", async (req, res) => {
  try {
    const { user_id } = req.body;

    await pool.query(
      `UPDATE users SET is_online = false, last_seen = NOW() WHERE id = $1`,
      [user_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ success: false });
  }
});

// =========================
// ✅ LOGOUT (NEW API)
// =========================
router.post("/logout", async (req, res) => {
  try {
    const { user_id } = req.body;

    await pool.query(
      `UPDATE users SET is_online = false, last_seen = NOW() WHERE id = $1`,
      [user_id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Logout error", err);
    res.status(500).json({ success: false });
  }
});

// =========================
// ✅ GET PROFILE (UNCHANGED)
// =========================
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as MyJWT;

    const result = await pool.query(
      "SELECT id, full_name, email, mobile, job_preparation, preparation_year FROM users WHERE id=$1",
      [decoded.id]
    );

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ REST OF YOUR FILE (VERIFY EMAIL, FORGOT PASSWORD, RESET PASSWORD)
// ✅ ALL YOUR EXISTING CODE IS KEPT AS-IS BELOW
// ✅ NO ROUTE REMOVED

// VERIFY EMAIL

router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE verification_token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = result.rows[0];

    // Check expiration
    if (new Date() > new Date(user.verification_expires)) {
      return res.status(400).json({ message: "Token expired" });
    }

    // Update user as verified
    await pool.query(
      `UPDATE users 
       SET is_verified = true, verification_token = NULL, verification_expires = NULL 
       WHERE id = $1`,
      [user.id]
    );

    return res.send(`
      <h1>Email Verified Successfully </h1>
      <p>You can now login.</p>
    `);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// FORGOT PASSWORD

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await pool.query(
      `UPDATE users SET reset_password_token=$1, reset_password_expires=$2 WHERE email=$3`,
      [resetToken, expiresAt, email]
    );
    // const resetLink = `https://informational-paxton-unliquidated.ngrok-free.dev/reset-password/${resetToken}`;
    // const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    // https://slimy-swans-say.loca.lt
    const resetLink = `http://localhost:5173/${resetToken}`;

    await sendResetPasswordEmail(email, resetLink);

    return res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// RESET PASSWORD

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res.status(400).json({ message: "Missing token or password" });

    const result = await pool.query(
      "SELECT * FROM users WHERE reset_password_token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = result.rows[0];

    if (new Date() > new Date(user.reset_password_expires)) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users SET password=$1, reset_password_token=NULL, reset_password_expires=NULL WHERE id=$2`,
      [hashedPassword, user.id]
    );

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset password POST route
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const result = await pool.query(
      "SELECT * FROM users WHERE reset_password_token = $1",
      [token]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    const user = result.rows[0];

    // Check expiration
    if (new Date() > new Date(user.reset_password_expires))
      return res.status(400).json({ message: "Token expired" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users 
       SET password = $1, reset_password_token = NULL, reset_password_expires = NULL 
       WHERE id = $2`,
      [hashedPassword, user.id]
    );

    res.json({ message: "Password reset successful " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
