import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

// ドキュメントの属性を定義 - exportして他の場所でも使えるようにする
export interface DocumentAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

// 作成時に省略可能な属性
export interface DocumentCreationAttributes
  extends Optional<DocumentAttributes, "id" | "createdAt" | "updatedAt"> {}

// Documentモデルのクラス
class Document extends Model<DocumentAttributes, DocumentCreationAttributes> {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 型アサーションのためのメソッド定義（Sequelizeの関連付け用）
  public readonly user?: User;
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
      validate: {
        notEmpty: true, // 空文字列を禁止
      },
    },
    content: {
      type: DataTypes.TEXT("long"), // 'long'を指定して大容量のテキストを扱えるようにする
      allowNull: false,
      defaultValue: "", // 空のコンテンツをデフォルト値として設定
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
    indexes: [
      { name: "idx_documents_userId", fields: ["userId"] },
      { name: "idx_documents_updatedAt", fields: ["updatedAt"] },
      { name: "idx_documents_title", fields: ["title"] },
    ],
  }
);

// リレーションシップの設定
Document.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Document;
