import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { fetchDocuments } from "../utils/api";
import "../App.css";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);

  // ドキュメントリストを読み込む関数
  const loadDocuments = async () => {
    try {
      const docs = await fetchDocuments();

      // 作成日時の新しい順にソート
      const sortedDocs = [...docs].sort((a, b) => {
        // createdAtが日付文字列の場合
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setDocuments(sortedDocs);
      return sortedDocs;
    } catch (error) {
      console.error("ドキュメント取得エラー:", error);
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
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      initialLoad();
    }
  }, [user, id, navigate]);

  if (isLoading) return <div className="loading">Loading...</div>;

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
          <div className="empty-state mt-12">
            <p>👈 左のサイドバーからドキュメントを新規作成してください</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
