import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// 公開エンドポイント
router.post("/register", register);
router.post("/login", login);

// 認証が必要なエンドポイント
router.get("/me", authenticateToken, (req, res) => {
  // @ts-ignore - req.userはミドルウェアで追加される
  res.json(req.user);
});

export default router;
