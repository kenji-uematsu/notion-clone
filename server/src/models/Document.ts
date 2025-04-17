import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

// ドキュメントの属性を定義
interface DocumentAttributes {
  id: number;
  title: string;
  content: string;
  userId: number; // ユーザーとの関連付け
  createdAt: Date;
  updatedAt: Date;
}

// 作成時に省略可能な属性（自動生成される項目）
interface DocumentCreationAttributes
  extends Optional<DocumentAttributes, "id" | "createdAt" | "updatedAt"> {}

// Documentモデルのクラス
class Document extends Model<DocumentAttributes, DocumentCreationAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Sequelizeモデルの初期化
Document.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Document",
  }
);

// リレーションシップの設定
Document.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Document;
