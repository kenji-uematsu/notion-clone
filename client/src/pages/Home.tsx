import React from "react";
import useWorkspace from "../hooks/useWorkspace";
import { useDocument } from "../hooks/useDocument";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";

const Home: React.FC = () => {
  const { workspaces } = useWorkspace();
  const { document } = useDocument("");

  return (
    <div className="home-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Editor document={document} />
      </div>
    </div>
  );
};

export default Home;
