import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import Editor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Document: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { document, error, loading } = useDocument(documentId || "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="document-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <Editor document={document} />
      </div>
    </div>
  );
};

export default Document;
