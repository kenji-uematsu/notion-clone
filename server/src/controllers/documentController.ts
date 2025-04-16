import { Request, Response } from "express";
import Document from "../models/Document";

// ドキュメントを新規作成
export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    // Sequelize方式でドキュメントを作成
    const newDocument = await Document.create({
      title,
      content,
      userId: req.user.id, // MySQLではuserIdフィールドを使用
    });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error("ドキュメント作成エラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
};

// ユーザーの全ドキュメントを取得
export const getDocuments = async (req: Request, res: Response) => {
  try {
    // ユーザーが認証されているか確認
    if (!req.user) {
      return res.status(401).json({ message: "認証が必要です" });
    }

    // Sequelize方式でクエリ
    const documents = await Document.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["updatedAt", "DESC"]], // 最新更新順
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error("ドキュメント取得エラー:", error);
    res.status(500).json({ message: "サーバーエラーが発生しました" });
  }
};

// IDによるドキュメント取得
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    // findByPkを使用して主キーで検索
    const document = await Document.findByPk(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "ドキュメントが見つかりません" });
    }

    // ドキュメント所有者の確認 (セキュリティ対策)
    if (document.userId !== req.user.id) {
      return res.status(403).json({ message: "アクセス権限がありません" });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error("ドキュメント取得エラー:", error);
    res
      .status(500)
      .json({ message: "ドキュメント取得中にエラーが発生しました" });
  }
};

// ドキュメントの更新
export const updateDocument = async (req: Request, res: Response) => {
  try {
    // まず対象ドキュメントを取得
    const document = await Document.findByPk(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "ドキュメントが見つかりません" });
    }

    // ドキュメント所有者の確認 (セキュリティ対策)
    if (document.userId !== req.user.id) {
      return res.status(403).json({ message: "アクセス権限がありません" });
    }

    // updateメソッドで更新
    await document.update(req.body);

    // 更新後のドキュメントを取得して返す
    const updatedDocument = await Document.findByPk(req.params.id);
    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error("ドキュメント更新エラー:", error);
    res
      .status(500)
      .json({ message: "ドキュメント更新中にエラーが発生しました" });
  }
};

// ドキュメントの削除
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    // まず対象ドキュメントを取得
    const document = await Document.findByPk(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "ドキュメントが見つかりません" });
    }

    // ドキュメント所有者の確認 (セキュリティ対策)
    if (document.userId !== req.user.id) {
      return res.status(403).json({ message: "アクセス権限がありません" });
    }

    // destroyメソッドで削除
    await document.destroy();

    res.status(200).json({ message: "ドキュメントが正常に削除されました" });
  } catch (error) {
    console.error("ドキュメント削除エラー:", error);
    res
      .status(500)
      .json({ message: "ドキュメント削除中にエラーが発生しました" });
  }
};
