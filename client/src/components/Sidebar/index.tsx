import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  // AuthContextからユーザー情報とログアウト関数を取得
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // ログアウト後はログイン画面にリダイレクト
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Notion Clone</h2>

      {/* ログインユーザー情報の表示エリア */}
      <div className="user-info">
        {user ? (
          <>
            <div className="user-email">{user.email}</div>
            <button onClick={handleLogout} className="logout-button">
              ログアウト
            </button>
          </>
        ) : (
          <div className="user-email">未ログイン</div>
        )}
      </div>

      <nav>
        <ul>
          <li>Home</li>
          <li>Workspace</li>
          <li>Documents</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
