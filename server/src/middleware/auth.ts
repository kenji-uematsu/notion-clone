import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { JWT_SECRET } from "../config/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "認証が必要です" });

  try {
    if (!JWT_SECRET) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as { id: number };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりません" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "無効または期限切れのトークン" });
  }
};
