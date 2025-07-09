import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// CSRFトークンを取得する関数
const getCsrfToken = (): string | null => {
  // Cookieからcsrftokenを取得
  const name = 'csrftoken';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

// axiosインスタンスの作成
const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター：CSRFトークンを自動的に追加
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // POST, PUT, PATCH, DELETEリクエストにCSRFトークンを追加
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター：エラーハンドリングの改善
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // CSRFエラーの場合の処理
    if (error.response?.status === 403 && error.response?.data?.detail?.includes('CSRF')) {
      console.warn('CSRF token validation failed. Please refresh the page.');
      // 必要に応じてページリロードやトークン再取得の処理を追加
    }
    
    // 本番環境では詳細なエラー情報をコンソールに出力しない
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error);
    } else {
      // 本番環境では一般的なエラーメッセージのみ
      console.error('An error occurred while processing your request.');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
export { getCsrfToken };
