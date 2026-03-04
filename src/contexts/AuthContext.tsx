
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../utils/apiClient';
import { SessionManager, setSecurityHeaders, checkBrowserSecurity } from '../utils/security';
import { CategoryId, resolveUserCategoryId } from '../utils/categoryAccess';
type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  userCategoryId: CategoryId | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  securityWarnings: string[];
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  userCategoryId: null,
  login: async () => {},
  logout: async () => {},
  securityWarnings: [],
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userCategoryId, setUserCategoryId] = useState<CategoryId | null>(null);
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);

  useEffect(() => {
    // セキュリティヘッダーの設定
    setSecurityHeaders();
    
    // ブラウザセキュリティチェック
    const securityCheck = checkBrowserSecurity();
    setSecurityWarnings(securityCheck.warnings);
    
    (async () => {
      try {
        const response = await apiClient.get('/users/me');
        setIsLoggedIn(true);
        setUserCategoryId(resolveUserCategoryId(response.data as Record<string, unknown>));
        
        // ログイン状態の場合、セッション管理を開始
        const sessionManager = SessionManager.getInstance();
        sessionManager.startSession(() => {
          // セッションタイムアウト時の処理
          logout();
          alert('セッションがタイムアウトしました。再度ログインしてください。');
        });
      } catch {
        setIsLoggedIn(false);
        setUserCategoryId(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    await apiClient.post('/users/login/', {
      email: email,
      password: password
    });
    setIsLoggedIn(true);
    try {
      const response = await apiClient.get('/users/me');
      setUserCategoryId(resolveUserCategoryId(response.data as Record<string, unknown>));
    } catch {
      setUserCategoryId(null);
    }
    
    // ログイン成功時にセッション管理を開始
    const sessionManager = SessionManager.getInstance();
    sessionManager.startSession(() => {
      logout();
      alert('セッションがタイムアウトしました。再度ログインしてください。');
    });
  };

  const logout = async () => {
    try {
      await apiClient.post('/users/logout/', {});
    } catch (error) {
      // ログアウト時のエラーは無視（ネットワークエラーなど）
      console.warn('Logout request failed, but proceeding with local logout');
    } finally {
      setIsLoggedIn(false);
      setUserCategoryId(null);
      
      // セッション管理をクリア
      const sessionManager = SessionManager.getInstance();
      sessionManager.clearSession();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, userCategoryId, login, logout, securityWarnings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
