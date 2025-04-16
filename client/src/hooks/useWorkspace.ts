import { useEffect, useState } from "react";
import { Workspace } from "../types/workspace";
import { fetchWorkspaces } from "../utils/api";

const useWorkspace = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const data = await fetchWorkspaces();
        setWorkspaces(data);
      } catch (err) {
        setError("Failed to load workspaces");
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaces();
  }, []);

  return { workspaces, selectedWorkspace, loading, error };
};

export default useWorkspace;
