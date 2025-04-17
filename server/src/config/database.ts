import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "notion_clone",
  process.env.DB_USER || "notion_user",
  process.env.DB_PASSWORD || "password123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT || "3306"),
    // 開発環境の場合のみログを表示
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    // 日本語（絵文字含む）をサポート
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to MySQL database.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

testConnection();

export default sequelize;
