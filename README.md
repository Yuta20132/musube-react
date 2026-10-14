# musuBe フロントエンド

React / TypeScript / Vite。Node.js 22.12以上を使用します。

```sh
npm ci
npm start
npm run build
npm test
npm audit
```

開発サーバーは `http://localhost:3000`。APIはデフォルトで `/api` を経由して `http://localhost:8080` に転送します。別APIを利用する場合は `.env.development` の `REACT_APP_API_URL` に設定します。環境変数はブラウザに公開されるため秘密情報を入れないでください。

本番ビルドは `build/` に出力します。付属Dockerfileは `/api` を利用する同一Origin構成でビルドします。VPSの起動手順は隣のリポジトリの `musuBe_rails/deploy/README.md` にあります。

管理者は `/admin` でユーザーの利用停止・再開、コンテンツ削除、操作履歴を確認できます。表示制御とは独立してRailsが認証・権限を検証します。
