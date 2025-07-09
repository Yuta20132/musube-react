// セキュリティ関連のユーティリティ関数

// Content Security Policy (CSP) の設定
export const setSecurityHeaders = (): void => {
  // CSPメタタグが存在しない場合のみ追加
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // React開発時に必要
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' " + (process.env.REACT_APP_API_URL || ''),
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    document.head.appendChild(cspMeta);
  }

  // X-Frame-Options の設定
  if (!document.querySelector('meta[http-equiv="X-Frame-Options"]')) {
    const frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = 'DENY';
    document.head.appendChild(frameMeta);
  }

  // X-Content-Type-Options の設定
  if (!document.querySelector('meta[http-equiv="X-Content-Type-Options"]')) {
    const contentTypeMeta = document.createElement('meta');
    contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
    contentTypeMeta.content = 'nosniff';
    document.head.appendChild(contentTypeMeta);
  }

  // Referrer-Policy の設定
  if (!document.querySelector('meta[name="referrer"]')) {
    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrerMeta);
  }
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
