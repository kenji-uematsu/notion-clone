import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Notion Clone</h2>
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
