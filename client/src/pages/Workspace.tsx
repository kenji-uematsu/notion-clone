import React from "react";
import useWorkspace from "../hooks/useWorkspace";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";

const Workspace: React.FC = () => {
  const { workspaces, selectedWorkspace } = useWorkspace();

  return (
    <div className="workspace-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {selectedWorkspace ? (
          <Editor workspace={selectedWorkspace} />
        ) : (
          <div>Please select a workspace</div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
