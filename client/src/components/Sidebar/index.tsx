import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";
// Material UI v4からのアイコンインポート
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { fetchDocuments, createDocument } from "../../utils/api";

const Sidebar: React.FC = () => {
  // AuthContextからユーザー情報とログアウト関数を取得
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id: currentDocId } = useParams(); // 現在表示中のドキュメントIDを取得
  const [documents, setDocuments] = useState<any[]>([]);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false); // 作成中状態の管理

  // ドキュメント一覧の取得
  const loadDocuments = async () => {
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("ドキュメントの取得に失敗しました", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  // 新規ドキュメント作成処理
  const handleCreateDocument = async (e: React.MouseEvent) => {
    e.stopPropagation(); // イベント伝播を止める
    console.log("クリックされました"); // テスト用ログ

    if (isCreatingDoc) return;

    try {
      setIsCreatingDoc(true);

      // 新規ドキュメントのデータ
      const newDocData = {
        title: "新規",
        content: "",
      };

      // APIを呼び出して新規ドキュメントを作成
      const createdDoc = await createDocument(newDocData);
      console.log("新規ドキュメントを作成しました:", createdDoc);

      // ドキュメントリストを更新
      await loadDocuments();

      // 新規作成したドキュメントに移動（オプション）
      navigate(`/${createdDoc.id}`);
    } catch (error) {
      console.error("ドキュメント作成に失敗しました:", error);
    } finally {
      setIsCreatingDoc(false);
    }
  };

  // ドキュメント選択ハンドラを修正
  const handleDocumentClick = (docId: number) => {
    navigate(`/${docId}`); // `/documents/${docId}` から変更
  };

  // JSX
  return (
    <div className="sidebar">
      <h2>Notion Clone</h2>

      {/* ユーザー情報 */}
      <div className="user-info">
        {user ? (
          <>
            <div className="user-email">{user.email}</div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
              }}
              className="logout-button"
            >
              <ExitToAppIcon /> ログアウト
            </button>
          </>
        ) : (
          <div className="user-email">未ログイン</div>
        )}
      </div>

      {/* ドキュメントセクション */}
      <div className="section-header">
        <h3>マイドキュメント</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleCreateDocument(e);
          }}
          className="icon-button"
        >
          <AddIcon />
        </button>
      </div>

      {/* ドキュメントリスト */}
      <div className="document-list">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className={`document-item ${
                doc.id.toString() === currentDocId ? "active" : ""
              }`}
              onClick={() => handleDocumentClick(doc.id)}
            >
              {doc.title}
            </div>
          ))
        ) : (
          <div className="empty-message">ドキュメントがありません</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
