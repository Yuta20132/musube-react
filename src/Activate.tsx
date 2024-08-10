//とりあえずActivate.tsxをここに

/*
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// TypeScriptでの型定義
// useParamsの返り値の型を定義します。ここでは`pk` (public key) が文字列であると想定します。
interface RouteParams {
    pk: string;
}

const Activate: React.FC = () => {
    // useParamsを使用してルートパラメータから`pk`を取得します。
    const { pk } = useParams<RouteParams>();

    // message状態を管理するためのuseState。初期値はアカウントアクティベーションの進行中を示すメッセージです。
    const [message, setMessage] = useState<string>('Activating your account...');

    // useEffectフックを使用して、コンポーネントのマウント時にアクティベーション関数を実行します。
    useEffect(() => {
        const activateAccount = async () => {
            try {
                // axiosを使用してGETリクエストを送信し、アクティベーションを試みます。
                const response = await axios.get(`http://127.0.0.1:8000/activate/${pk}/`);
                // レスポンスからメッセージを取得してstateを更新します。
                setMessage(response.data.message);
            } catch (error) {
                console.error(error);
                // エラーが発生した場合は失敗したことをユーザーに通知します。
                setMessage('Activation failed');
            }
        };
        activateAccount();
    }, [pk]); // useEffectの依存配列に`pk`を設定して、`pk`が変更された際に再実行します。

    // コンポーネントのレンダリング部分
    return (
        <div>
            <h1>Activate Account</h1>
            <p>{message}</p>
        </div>
    );
};

export default Activate;
*/