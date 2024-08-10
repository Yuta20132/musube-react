import React from 'react';

// Successコンポーネントは、特定の操作が成功したことをユーザーに通知するシンプルなUIを提供します。
const Success: React.FC = () => {
    // コンポーネントのレンダリング内容は、成功メッセージを表示するだけのシンプルなものです。
    // div要素内にh1タグで「Success」という見出しと、
    // pタグで「Success!」というテキストを表示しています。
    return (
        <div>
            <h1>Success</h1>
            <p>Success!</p>
        </div>
    );
};

// Successコンポーネントを他のファイルからインポートして使用できるようにexportします。
export default Success;
