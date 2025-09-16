// セキュリティ関連のユーティリティ関数

// CSPのクライアント側設定は行わない（サーバー側で設定してください）
export const setSecurityHeaders = (): void => {
};

// セッションタイムアウトの管理
export class SessionManager {
  private static instance: SessionManager;
  private timeoutId: NodeJS.Timeout | null = null;
  private readonly TIMEOUT_DURATION = 30 * 60 * 1000; // 30分

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public startSession(onTimeout: () => void): void {
    this.resetTimeout(onTimeout);
    
    // ユーザーアクティビティを監視
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const resetTimer = () => this.resetTimeout(onTimeout);
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });
  }

  private resetTimeout(onTimeout: () => void): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      onTimeout();
    }, this.TIMEOUT_DURATION);
  }

  public clearSession(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

// ブラウザのセキュリティ機能チェック
export const checkBrowserSecurity = (): {
  isSecure: boolean;
  warnings: string[];
} => {
  const warnings: string[] = [];
  
  // HTTPS チェック
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    warnings.push('HTTPSを使用していません');
  }
  
  // Secure Context チェック
  if (!window.isSecureContext) {
    warnings.push('セキュアコンテキストではありません');
  }
  
  // Local Storage の可用性チェック
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    warnings.push('Local Storageが利用できません');
  }
  
  // Cookie の可用性チェック
  if (!navigator.cookieEnabled) {
    warnings.push('Cookieが無効になっています');
  }
  
  return {
    isSecure: warnings.length === 0,
    warnings
  };
};

// パスワード強度チェッカー
export const getPasswordStrength = (password: string): {
  score: number; // 0-4
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) {
    score++;
  } else {
    feedback.push('8文字以上にしてください');
  }
  
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push('小文字を含めてください');
  }
  
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push('大文字を含めてください');
  }
  
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('数字を含めてください');
  }
  
  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push('記号を含めてください');
  }
  
  return { score: Math.min(score, 4), feedback };
};

// 機密データのマスキング
export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars) {
    return '*'.repeat(data.length);
  }
  
  const visible = data.slice(-visibleChars);
  const masked = '*'.repeat(data.length - visibleChars);
  return masked + visible;
};
