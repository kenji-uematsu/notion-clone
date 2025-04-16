import React, { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { document } = useDocument("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ユーザーが認証されている場合のみドキュメントを取得
    if (user) {
      // ドキュメント取得ロジック
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading && !user) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <div className="main-content">
        <Sidebar />
        <Editor document={document} />
      </div>
    </div>
  );
};

export default Home;
