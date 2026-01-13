import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// Extend Express Request to include "user"
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization; // always lowercase

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // Extract only the token (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  if (!token) { 
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET as string;

    // Now token is guaranteed string → NO TS ERROR
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
