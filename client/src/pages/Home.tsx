import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { fetchDocuments } from "../utils/api";
import "../App.css";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { id: documentId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 例: Home.tsx内でのURLパラメータ取得
  const { id } = useParams();
  console.log("現在のドキュメントID:", id);

  // ユーザー認証確認と最新ドキュメントへのリダイレクト
  useEffect(() => {
    const loadLatestDocument = async () => {
      try {
        // ドキュメント一覧を取得（デフォルトで新しい順）
        const docs = await fetchDocuments();

        // ドキュメントがあり、URLにIDが指定されていない場合
        if (docs.length > 0 && !documentId) {
          // 最新のドキュメントへリダイレクト
          navigate(`/${docs[0].id}`, { replace: true });
        }

        setIsLoading(false);
      } catch (error) {
        console.error("ドキュメント取得エラー:", error);
        setIsLoading(false);
      }
    };

    if (user && !documentId) {
      loadLatestDocument();
    } else if (user) {
      setIsLoading(false);
    }
  }, [user, documentId, navigate]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-container">
      <Sidebar />
      <main className="main-content">
        {documentId ? (
          <Editor documentId={documentId} />
        ) : (
          <div className="empty-state">
            <p>
              👈
              左のサイドバーからドキュメントを選択するか、新規作成してください
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
