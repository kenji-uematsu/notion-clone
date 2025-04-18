import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt";

// ユーザー登録
export const register = async (req: Request, res: Response) => {
  try {
    // usernameを削除し、emailとpasswordのみ取得
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // メールアドレスが既に使用されているか確認
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 新しいユーザーを作成
    const user = await User.create({ email, password });

    // JWT_SECRETが設定されているか確認
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    // JWTトークンを生成
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({ user, token });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    // エラー処理を修正
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// ユーザーログイン
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ユーザーを探す
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // パスワードを検証
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // JWT_SECRETが設定されているか確認
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }

    // JWTトークンを生成
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
