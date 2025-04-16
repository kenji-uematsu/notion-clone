import axios from "axios";

const API_BASE_URL = `http://localhost:${
  process.env.REACT_APP_API_PORT || "3001"
}/api`; // バックエンドのAPIベースURL

// タスクを取得する関数
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw new Error("タスクの取得に失敗しました");
  }
};

// タスク型の定義
interface Task {
  title: string;
  description?: string;
  completed?: boolean;
  [key: string]: any;
}

// タスクを作成する関数
export const createTask = async (taskData: Task) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw new Error("タスクの作成に失敗しました");
  }
};

// タスクを更新する関数
export const updateTask = async (taskId: string, taskData: Task) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${taskId}`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw new Error("タスクの更新に失敗しました");
  }
};

// タスクを削除する関数
export const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    throw new Error("タスクの削除に失敗しました");
  }
};

// 認証関連のAPI
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error("ログインに失敗しました");
  }
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("ユーザー登録に失敗しました");
  }
};

// ドキュメント関連のAPI
export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents`);
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの取得に失敗しました");
  }
};

interface Document {
  title: string;
  content?: any;
  [key: string]: any;
}

export const createDocument = async (documentData: Document) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/documents`,
      documentData
    );
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの作成に失敗しました");
  }
};

export const updateDocument = async (
  documentId: string,
  documentData: Document
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/documents/${documentId}`,
      documentData
    );
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの更新に失敗しました");
  }
};

export const deleteDocument = async (documentId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/documents/${documentId}`);
  } catch (error) {
    throw new Error("ドキュメントの削除に失敗しました");
  }
};

// 単一のドキュメントを取得する関数
export const fetchDocument = async (documentId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの取得に失敗しました");
  }
};

// ドキュメントを保存する関数（updateDocumentのエイリアス）
export const saveDocument = async (document: Document & { id: string }) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/documents/${document.id}`,
      document
    );
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの保存に失敗しました");
  }
};

// ワークスペース関連のAPI
export const fetchWorkspaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workspaces`);
    return response.data;
  } catch (error) {
    throw new Error("ワークスペースの取得に失敗しました");
  }
};

export const fetchWorkspace = async (workspaceId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/workspaces/${workspaceId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("ワークスペースの取得に失敗しました");
  }
};

interface Workspace {
  name: string;
  description?: string;
  [key: string]: any;
}

export const createWorkspace = async (workspaceData: Workspace) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workspaces`,
      workspaceData
    );
    return response.data;
  } catch (error) {
    throw new Error("ワークスペースの作成に失敗しました");
  }
};

export const updateWorkspace = async (
  workspaceId: string,
  workspaceData: Workspace
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/workspaces/${workspaceId}`,
      workspaceData
    );
    return response.data;
  } catch (error) {
    throw new Error("ワークスペースの更新に失敗しました");
  }
};

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/workspaces/${workspaceId}`);
  } catch (error) {
    throw new Error("ワークスペースの削除に失敗しました");
  }
};

export const api = {
  getCurrentUser: async () => {
    try {
      // 保存されたトークンを取得
      const token = localStorage.getItem("authToken");
      if (!token) return null;

      // トークンを使用してユーザー情報を取得
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("ユーザー情報取得エラー:", error);
      localStorage.removeItem("authToken"); // 無効なトークンをクリア
      return null;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      // トークンを保存
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data.user;
    } catch (error) {
      console.error("ログインエラー:", error);
      throw new Error("ログインに失敗しました");
    }
  },

  signup: async (email: string, password: string) => {
    try {
      // nameフィールドを削除、emailとpasswordのみ送信
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        // nameフィールドを削除
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      return response.data.user;
    } catch (error) {
      console.error("サインアップエラー:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    console.log("ログアウトしました");
  },
};
