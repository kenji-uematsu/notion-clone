import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRETが設定されていません。サーバーを停止します。");
  process.exit(1);
}

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
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
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
