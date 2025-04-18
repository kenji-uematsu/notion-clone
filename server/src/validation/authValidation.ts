import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// 登録バリデーションルール
export const registerValidation = [
  body("email").isEmail().withMessage("有効なメールアドレスを入力してください"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは6文字以上必要です"),

  // バリデーション結果の確認
  validateResults,
];

// ログインバリデーションルール
export const loginValidation = [
  body("email").isEmail().withMessage("有効なメールアドレスを入力してください"),
  body("password").notEmpty().withMessage("パスワードを入力してください"),

  // バリデーション結果の確認
  validateResults,
];

// バリデーション結果を確認するミドルウェア
function validateResults(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
}
