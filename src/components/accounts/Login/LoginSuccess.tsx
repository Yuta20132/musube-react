import React from 'react';

// LoginSuccessコンポーネントはログインが成功したときに表示されるメッセージを表示します。
const LoginSuccess: React.FC = () => {
    // コンポーネントがレンダリングするJSXをreturn文内で定義します。
    return (
        <div>
            {/* ページのタイトルとしてh1タグを使用 */}
            <h1>Login Success</h1>
            {/* 成功メッセージを表示 */}
            <p>Login Success!</p>
        </div>
    );
};

// 他のファイルからこのコンポーネントをimportして使用できるようにexportします。
export default LoginSuccess;
