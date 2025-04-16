import { useState, useEffect } from "react";
import DocumentModel from "../types/document"; // 型名を変更
import { fetchDocument, saveDocument } from "../utils/api";

export const useDocument = (documentId: string) => {
  // document型を更新
  const [document, setDocument] = useState<DocumentModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const fetchedDocument = await fetchDocument(documentId);
        setDocument(fetchedDocument);
      } catch (err) {
        setError("Failed to load document");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [documentId]);

  const updateDocument = async (updatedDocument: DocumentModel) => {
    try {
      await saveDocument(updatedDocument);
      setDocument(updatedDocument);
    } catch (err) {
      setError("Failed to update document");
    }
  };

  return { document, loading, error, updateDocument };
};
