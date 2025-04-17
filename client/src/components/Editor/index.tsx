import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchDocument, updateDocument } from "../../utils/api";
import "./Editor.css";

interface EditorProps {
  documentId?: string;
}

const Editor: React.FC<EditorProps> = ({ documentId }) => {
  // URLからドキュメントIDを取得
  const params = useParams();
  const currentDocId = documentId || params.id;

  // 状態管理
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("保存済み");
  const [error, setError] = useState("");

  // ドキュメントの読み込み
  useEffect(() => {
    const loadDocument = async () => {
      if (!currentDocId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("ドキュメント読み込み開始:", currentDocId);

        // APIを使って個別ドキュメントを取得
        const doc = await fetchDocument(currentDocId);
        console.log("取得したドキュメント:", doc);

        if (doc) {
          // 取得したデータをステートにセット
          setTitle(doc.title || "");
          setContent(doc.content || "");
        }
      } catch (err) {
        console.error("ドキュメント読み込みエラー:", err);
        setError("ドキュメントの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [currentDocId]);

  // 自動保存のためのdebounce関数
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // 変更を保存する関数
  const saveChanges = async (newTitle: string, newContent: string) => {
    if (!currentDocId) return;

    try {
      setSaveStatus("保存中...");
      await updateDocument(currentDocId, {
        title: newTitle,
        content: newContent,
      });
      setSaveStatus("保存済み");
    } catch (err) {
      console.error("保存エラー:", err);
      setSaveStatus("保存に失敗しました");
    }
  };

  // デバウンスした保存関数
  const debouncedSave = useCallback(debounce(saveChanges, 1000), [
    currentDocId,
  ]);

  // タイトルの変更ハンドラ
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSaveStatus("保存中...");
    debouncedSave(newTitle, content);
  };

  // コンテンツの変更ハンドラ
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSaveStatus("保存中...");
    debouncedSave(title, newContent);
  };

  // 読み込み中表示
  if (loading) {
    return <div className="editor-loading">読み込み中...</div>;
  }

  // エラー表示
  if (error) {
    return <div className="editor-error">{error}</div>;
  }

  return (
    <div className="notion-editor">
      {/* 保存状態の表示 */}
      <div className="save-status">{saveStatus}</div>

      {/* タイトル入力 */}
      <input
        type="text"
        className="editor-title"
        value={title}
        onChange={handleTitleChange}
        placeholder="無題"
      />

      {/* 本文入力 */}
      <textarea
        className="editor-content"
        value={content}
        onChange={handleContentChange}
        placeholder="ここに本文を入力..."
      />
    </div>
  );
};

export default Editor;
