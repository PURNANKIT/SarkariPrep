import express, { Router } from 'express';
import pool from '../db.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            "SELECT id, full_name, email, mobile, job_preparation, preparation_year FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({msg: "User not found"});
        }

        res.json({user: result.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Server error"});
    }
})

export default router;