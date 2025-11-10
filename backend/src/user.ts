import express from 'express';
import bcrypt from 'bcrypt';
import pool from './db';

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log('Router hit:', req.method, req.path);
  next();
});

// Signup
router.post('/signup', async (req, res) => {
  const { full_name, email, mobile, job_preparation, preparation_year, password } = req.body;

  if (!full_name || !email || !mobile || !job_preparation || !preparation_year || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existUsers = await pool.query(
      "SELECT email, mobile FROM users WHERE email = $1 OR mobile = $2",
      [email, mobile]
    );

    if (existUsers.rows.length > 0) {
      const user = existUsers.rows[0];
      if (user.email === email) return res.status(400).json({ msg: "Email already registered" });
      if (user.mobile === mobile) return res.status(400).json({ msg: "Mobile already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (full_name, email, mobile, job_preparation, preparation_year, password) VALUES ($1, $2, $3, $4, $5, $6)",
      [full_name, email, mobile, job_preparation, preparation_year, hashedPassword]
    );

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (err: any) {
    console.error("Registration error:", err);
    return res.status(500).json({ msg: "Server error, please try again later" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: "Email and password are required" });

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) return res.status(400).json({ msg: "Invalid Credentials" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ msg: "Invalid Credentials" });

    return res.status(200).json({ msg: "Login Successful" });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Server error, please try again later" });
  }
});

export default router;
