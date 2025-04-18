import express from "express";
import { register, login } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";
import {
  registerValidation,
  loginValidation,
} from "../validation/authValidation";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// 認証が必要なエンドポイント
router.get("/me", authenticateToken, (req, res) => {
  res.json(req.user);
});

export default router;
