import React, { useState } from "react";
import "./Editor.css";
import DocumentModel from "../../types/document"; // 名前変更した型をインポート

interface EditorProps {
  document?: DocumentModel | null;
  workspace?: { id: string; name: string }; // Define a basic structure for Workspace
}

const Editor: React.FC<EditorProps> = ({ document, workspace }) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div className="editor">
      <textarea
        className="editor-textarea"
        value={content}
        onChange={handleChange}
        placeholder="Write your notes here..."
      />
    </div>
  );
};

// Use the document prop as needed in the component logic
export default Editor;
