// 入力値検証とサニタイズのユーティリティ関数

// HTMLタグを除去する関数
export const sanitizeHtml = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

// XSS攻撃を防ぐためのエスケープ関数
export const escapeHtml = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

// 文字列の長さを検証する関数
export const validateLength = (input: string, min: number, max: number): boolean => {
  const trimmed = input.trim();
  return trimmed.length >= min && trimmed.length <= max;
};

// メールアドレスの形式を検証する関数
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// パスワードの強度を検証する関数
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('パスワードには大文字を含める必要があります');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('パスワードには小文字を含める必要があります');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('パスワードには数字を含める必要があります');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 投稿内容を検証・サニタイズする関数
export const validateAndSanitizePost = (title: string, content: string): {
  isValid: boolean;
  sanitizedTitle: string;
  sanitizedContent: string;
  errors: string[];
} => {
  const errors: string[] = [];
  
  // HTMLタグを除去
  const sanitizedTitle = sanitizeHtml(title.trim());
  const sanitizedContent = sanitizeHtml(content.trim());
  
  // 長さの検証
  if (!validateLength(sanitizedTitle, 1, 100)) {
    errors.push('タイトルは1文字以上100文字以下である必要があります');
  }
  
  if (!validateLength(sanitizedContent, 1, 1000)) {
    errors.push('内容は1文字以上1000文字以下である必要があります');
  }
  
  // 禁止文字列のチェック（例）
  const forbiddenPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i
  ];
  
  const checkForbidden = (text: string) => {
    return forbiddenPatterns.some(pattern => pattern.test(text));
  };
  
  if (checkForbidden(title) || checkForbidden(content)) {
    errors.push('不正な文字列が含まれています');
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedTitle,
    sanitizedContent,
    errors
  };
};

// SQLインジェクション対策のための基本的なチェック
export const containsSqlInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--|\/\*|\*\/|;|'|")/,
    /(\bOR\b|\bAND\b).*(\b=\b|\b<\b|\b>\b)/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};
