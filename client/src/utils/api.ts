import axios, { AxiosError, isAxiosError } from "axios";

const API_BASE_URL = `http://localhost:${
  process.env.REACT_APP_API_PORT || "3001"
}/api`;

// 認証付きAxiosインスタンスの作成
const authAxios = axios.create({
  baseURL: API_BASE_URL,
});

// リクエストインターセプターでトークンを自動的に追加
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
    const response = await authAxios.get("/documents");
    return response.data;
  } catch (error) {
    console.error("ドキュメント取得エラー:", error);
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
    const response = await authAxios.post("/documents", documentData);
    return response.data;
  } catch (error) {
    console.error("ドキュメント作成エラー:", error);
    throw new Error("ドキュメントの作成に失敗しました");
  }
};

export const updateDocument = async (
  documentId: string,
  documentData: Document
) => {
  try {
    const response = await authAxios.put(
      `/documents/${documentId}`,
      documentData
    );
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの更新に失敗しました");
  }
};

export const deleteDocument = async (documentId: string) => {
  try {
    await authAxios.delete(`/documents/${documentId}`);
  } catch (error) {
    throw new Error("ドキュメントの削除に失敗しました");
  }
};

// 単一のドキュメントを取得する関数
export const fetchDocument = async (id: string | number) => {
  try {
    const response = await authAxios.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    console.error("API呼び出しエラー:", error);
    throw new Error("ドキュメント取得に失敗しました");
  }
};

// ドキュメントを保存する関数（updateDocumentのエイリアス）
export const saveDocument = async (document: Document & { id: string }) => {
  try {
    const response = await authAxios.put(`/documents/${document.id}`, document);
    return response.data;
  } catch (error) {
    throw new Error("ドキュメントの保存に失敗しました");
  }
};

// 認証関連のAPIオブジェクト
export const api = {
  getCurrentUser: async () => {
    try {
      const response = await authAxios.get("/auth/me");
      return response.data;
    } catch (error) {
      // 型アサーションではなく型チェックを使用
      if (isAxiosError(error)) {
        if (error.response) {
          console.error(
            "サーバーエラー:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("レスポンスなし:", error.request);
        }
      } else {
        console.error("リクエストエラー:", error);
      }
      localStorage.removeItem("authToken");
      return null;
    }
  },

  login: async (email: string, password: string) => {
    try {
      // ログインだけは通常のaxiosを使用（トークンがまだない）
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
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
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
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
