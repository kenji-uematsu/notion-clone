import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";
// Material UI v4からのアイコンインポート
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { createDocument } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth"; // 追加：認証フックをインポート

interface SidebarProps {
  documents: any[]; // 親から渡されるドキュメントリスト
  refreshDocuments: () => Promise<any[]>;
}

const Sidebar: React.FC<SidebarProps> = ({ documents, refreshDocuments }) => {
  const navigate = useNavigate();
  const { id: currentDocId } = useParams(); // 現在表示中のドキュメントIDを取得
  const [isCreatingDoc, setIsCreatingDoc] = useState(false); // 作成中状態の管理
  const { user, logout } = useAuth(); // 追加：認証情報を取得

  // 新規ドキュメント作成処理を修正
  const handleCreateDocument = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCreatingDoc) return;

    try {
      setIsCreatingDoc(true);
      // 新規ドキュメント作成
      const createdDoc = await createDocument({ title: "新規", content: "" });

      // ドキュメントリストを更新
      await refreshDocuments();

      // 新規作成したドキュメントに移動
      navigate(`/${createdDoc.id}`);
    } catch (error) {
      console.error("ドキュメント作成エラー:", error);
    } finally {
      setIsCreatingDoc(false);
    }
  };

  // 追加：ログアウト処理
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  // JSX
  return (
    <div className="sidebar">
      <h2 className="text-4xl font-bold">Notion Clone</h2>

      {/* 追加：ユーザー情報とログアウトボタン */}
      <div className="user-section">
        <div className="user-info">
          {user && <p className="user-email">{user.email}</p>}
        </div>
        <button
          className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center">
            <ExitToAppIcon fontSize="small" className="mr-2" />
            <span>ログアウト</span>
          </div>
        </button>
      </div>

      {/* 追加：区切り線 */}
      <hr className="sidebar-divider" />

      {/* ドキュメントセクション */}
      <div className="section-header my-2">
        <h3 className="text-lg">マイドキュメント</h3>
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
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`document-item ${
              doc.id.toString() === currentDocId ? "active" : ""
            }`}
            onClick={() => navigate(`/${doc.id}`)}
          >
            {doc.title || "無題"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
