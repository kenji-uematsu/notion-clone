import dotenv from "dotenv";

// 環境変数をロード
dotenv.config();

// JWTシークレットを取得
const JWT_SECRET = process.env.JWT_SECRET;

// 存在チェック（アプリケーション起動時にチェック）
if (!JWT_SECRET) {
  console.error("JWT_SECRETが設定されていません。サーバーを停止します。");
  process.exit(1);
}

// キーをそのまま公開（既存コードとの互換性のため）
export { JWT_SECRET };
