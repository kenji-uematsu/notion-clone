import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigateを追加
import { fetchDocument, updateDocument, deleteDocument } from "../../utils/api"; // deleteDocumentを追加
import DeleteIcon from "@material-ui/icons/Delete";
import "./Editor.css";

interface EditorProps {
  documentId?: string;
  onDocumentChange?: () => Promise<void>;
}

const Editor: React.FC<EditorProps> = ({ documentId, onDocumentChange }) => {
  const params = useParams();
  const navigate = useNavigate(); // ナビゲーション用
  const currentDocId = documentId || params.id;

  const isMounted = useRef(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("保存済み");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const loadDocument = async () => {
      if (!currentDocId) {
        if (isMounted.current) setLoading(false);
        return;
      }

      try {
        if (isMounted.current) setLoading(true);

        const doc = await fetchDocument(currentDocId);

        if (isMounted.current && doc) {
          setTitle(doc.title || "");
          setContent(doc.content || "");
          setLoading(false);
        }
      } catch (err) {
        console.error("ドキュメント読み込みエラー:", err);
        if (isMounted.current) {
          setError("ドキュメントの読み込みに失敗しました");
          setLoading(false);
        }
      }
    };

    loadDocument();
  }, [currentDocId]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const saveChanges = async (newTitle: string, newContent: string) => {
    if (!currentDocId) return;

    try {
      if (isMounted.current) setSaveStatus("保存中...");
      await updateDocument(currentDocId, {
        title: newTitle,
        content: newContent,
      });
      if (isMounted.current) setSaveStatus("保存済み");

      if (onDocumentChange) {
        await onDocumentChange();
      }
    } catch (err) {
      console.error("保存エラー:", err);
      if (isMounted.current) setSaveStatus("保存に失敗しました");
    }
  };

  const debouncedSave = useCallback(debounce(saveChanges, 1000), [
    currentDocId,
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSaveStatus("保存中...");
    debouncedSave(newTitle, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSaveStatus("保存中...");
    debouncedSave(title, newContent);
  };

  const handleDeleteDocument = async () => {
    if (!currentDocId) return;

    if (window.confirm("このドキュメントを削除しますか？")) {
      try {
        if (isMounted.current) setSaveStatus("削除中...");

        await deleteDocument(currentDocId);

        if (onDocumentChange) {
          await onDocumentChange();
        }

        navigate("/");
      } catch (err) {
        console.error("ドキュメント削除エラー:", err);
        if (isMounted.current) {
          setError("ドキュメントの削除に失敗しました");
          setSaveStatus("エラー");
        }
      }
    }
  };

  if (loading) {
    return <div className="editor-loading">読み込み中...</div>;
  }

  if (error) {
    return <div className="editor-error">{error}</div>;
  }

  return (
    <div className="notion-editor px-4 w-32 md:w-96 lg:w-1/2">
      <div className="editor-header flex justify-between py-4">
        <button
          className="delete-button flex items-center justify-center"
          onClick={handleDeleteDocument}
        >
          <DeleteIcon />
        </button>

        <div className="save-status flex items-center">
          <span>{saveStatus}</span>
        </div>
      </div>

      <input
        type="text"
        className="editor-title w-full my-4 text-4xl font-bold"
        value={title}
        onChange={handleTitleChange}
        placeholder="新規ページ"
      />

      <textarea
        className="editor-content w-full my-4"
        value={content}
        onChange={handleContentChange}
        placeholder="本文を入力してください"
      />
    </div>
  );
};

export default Editor;
