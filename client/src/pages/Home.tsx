import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { fetchDocuments } from "../utils/api";
import { Document } from "../utils/api"; // 型をインポート
import "../App.css";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  // ドキュメントリストを読み込む関数
  const loadDocuments = async () => {
    try {
      const docs = await fetchDocuments();

      // 作成日時の新しい順にソート
      const sortedDocs = [...docs].sort((a, b) => {
        const dateA = new Date(a.createdAt || "").getTime();
        const dateB = new Date(b.createdAt || "").getTime();
        return dateB - dateA;
      });

      setError(null);
      setDocuments(sortedDocs);
      return sortedDocs;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "ドキュメント取得中にエラーが発生しました";
      console.error("ドキュメント取得エラー:", error);
      setError(errorMessage);
      return [];
    }
  };

  // ドキュメント更新後にリストを再読み込みする関数
  const refreshDocuments = async () => {
    await loadDocuments();
  };

  // 初期ロードとリダイレクト
  useEffect(() => {
    const initialLoad = async () => {
      try {
        setIsLoading(true);
        const docs = await loadDocuments();

        // ドキュメントがあり、URLにIDが指定されていない場合
        if (docs.length > 0 && !id) {
          // 最新のドキュメントへリダイレクト
          navigate(`/${docs[0].id}`, { replace: true });
        }
      } catch (error) {
        console.error("初期ロードエラー:", error);
        setError(
          error instanceof Error
            ? error.message
            : "読み込み中にエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      initialLoad();
    }
  }, [user, id, navigate]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="loading flex items-center justify-center h-screen">
        読み込み中...
      </div>
    );
  }

  // エラー発生時の表示
  if (error) {
    return (
      <div className="error-container flex items-center justify-center h-screen">
        <div className="error-message bg-red-50 p-4 rounded border border-red-200">
          <h3 className="text-red-800 font-medium">エラーが発生しました</h3>
          <p className="text-red-600">{error}</p>
          <button
            className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            onClick={refreshDocuments}
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container flex h-screen w-full">
      <Sidebar documents={documents} refreshDocuments={loadDocuments} />
      <main className="main-content flex justify-center h-full">
        {id ? (
          <Editor
            documentId={id}
            onDocumentChange={refreshDocuments} // 更新時にリスト再取得
          />
        ) : (
          <div className="empty-state flex items-center justify-center h-full p-6 text-gray-500">
            <div className="text-center">
              <p className="mb-4">
                👈 左のサイドバーからドキュメントを新規作成してください
              </p>
              {documents.length === 0 && (
                <p className="text-sm text-gray-400">
                  ドキュメントがまだありません
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
