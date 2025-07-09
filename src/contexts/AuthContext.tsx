
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../utils/apiClient';
import { SessionManager, setSecurityHeaders, checkBrowserSecurity } from '../utils/security';
type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  securityWarnings: string[];
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
  securityWarnings: [],
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);

  useEffect(() => {
    // セキュリティヘッダーの設定
    setSecurityHeaders();
    
    // ブラウザセキュリティチェック
    const securityCheck = checkBrowserSecurity();
    setSecurityWarnings(securityCheck.warnings);
    
    (async () => {
      try {
        await apiClient.get('/users/me');
        setIsLoggedIn(true);
        
        // ログイン状態の場合、セッション管理を開始
        const sessionManager = SessionManager.getInstance();
        sessionManager.startSession(() => {
          // セッションタイムアウト時の処理
          logout();
          alert('セッションがタイムアウトしました。再度ログインしてください。');
        });
      } catch {
        setIsLoggedIn(false);
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
      
      // セッション管理をクリア
      const sessionManager = SessionManager.getInstance();
      sessionManager.clearSession();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout, securityWarnings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
