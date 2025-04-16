import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workspace } from '../types/workspace';

interface WorkspaceContextType {
  workspaces: Workspace[];
  addWorkspace: (workspace: Workspace) => void;
  removeWorkspace: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces((prev) => [...prev, workspace]);
  };

  const removeWorkspace = (id: string) => {
    setWorkspaces((prev) => prev.filter((workspace) => workspace.id !== id));
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, addWorkspace, removeWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};