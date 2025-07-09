# セキュリティガイドライン

このドキュメントは、musube-reactプロジェクトのセキュリティ対策について説明します。

## 🛡️ 実装済みのセキュリティ対策

### 1. CSRF（Cross-Site Request Forgery）対策
- **実装場所**: `src/utils/apiClient.ts`
- **対策内容**:
  - CSRFトークンの自動取得・送信
  - POST/PUT/PATCH/DELETEリクエストに自動でCSRFトークンを付与
  - axiosインターセプターによる一元管理

### 2. 入力値検証・サニタイズ
- **実装場所**: `src/utils/validation.ts`
- **対策内容**:
  - HTMLタグの除去
  - XSS攻撃対策のエスケープ処理
  - 文字数制限の実装
  - メールアドレス形式の検証
  - パスワード強度チェック
  - SQLインジェクション対策

### 3. セキュリティヘッダーの設定
- **実装場所**: `src/utils/security.ts`
- **対策内容**:
  - Content Security Policy (CSP)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin

### 4. セッション管理
- **実装場所**: `src/utils/security.ts`, `src/contexts/AuthContext.tsx`
- **対策内容**:
  - 30分間のセッションタイムアウト
  - ユーザーアクティビティの監視
  - 自動ログアウト機能

### 5. エラーハンドリングの改善
- **実装場所**: `src/utils/apiClient.ts`
- **対策内容**:
  - 本番環境での詳細エラー情報の非表示
  - 開発環境でのみデバッグ情報を表示
  - セキュリティに配慮したエラーメッセージ

### 6. 環境変数の適切な管理
- **実装場所**: `.env.example`, `.gitignore`
- **対策内容**:
  - 機密情報の環境変数化
  - `.env`ファイルのGit除外
  - 設定例の提供

## 🔧 使用方法

### 1. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して適切な値を設定
```

### 2. APIクライアントの使用
```typescript
import apiClient from '../utils/apiClient';

// CSRFトークンが自動で付与される
const response = await apiClient.post('/api/endpoint', data);
```

### 3. 入力値検証の使用
```typescript
import { validateAndSanitizePost } from '../utils/validation';

const validation = validateAndSanitizePost(title, content);
if (!validation.isValid) {
  // エラーハンドリング
  console.error(validation.errors);
}
```

## ⚠️ 重要な注意事項

### 1. 本番環境での設定
- 必ずHTTPSを使用する
- 適切なCSRFトークンの設定をバックエンドで行う
- セキュリティヘッダーをサーバーレベルでも設定する

### 2. 依存関係のセキュリティ
```bash
# 定期的にセキュリティ監査を実行
npm audit
npm audit fix
```

### 3. 環境変数の管理
- 機密情報は絶対にコードにハードコードしない
- `REACT_APP_`プレフィックスが付いた変数のみクライアントサイドで利用可能
- 本番環境では適切な値に変更する

## 🚨 セキュリティチェックリスト

### 開発時
- [ ] 新しいフォームには入力値検証を実装
- [ ] APIリクエストには`apiClient`を使用
- [ ] 機密情報は環境変数で管理
- [ ] XSS攻撃につながる`dangerouslySetInnerHTML`は使用しない

### デプロイ前
- [ ] `npm audit`でセキュリティ脆弱性をチェック
- [ ] 環境変数が適切に設定されている
- [ ] HTTPSが有効になっている
- [ ] CSRFトークンがバックエンドで適切に設定されている

### 定期メンテナンス
- [ ] 依存関係のアップデート
- [ ] セキュリティパッチの適用
- [ ] ログの監視
- [ ] セッション管理の見直し

## 📚 参考資料

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## 🐛 セキュリティ問題の報告

セキュリティに関する問題を発見した場合は、以下の手順で報告してください：

1. 公開のIssueではなく、プライベートな方法で報告
2. 問題の詳細と再現手順を記載
3. 可能であれば修正案も提案

---

**注意**: このドキュメントは定期的に更新され、新しいセキュリティ対策が追加される可能性があります。
