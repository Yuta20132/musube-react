import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// DeleteUserコンポーネントではユーザーを削除する機能を提供します。
const DeleteUser: React.FC = () => {
    // usernameの状態を管理するuseStateフック。
    // useStateには初期値として空の文字列を設定します。
    const [username, setUsername] = useState<string>('');

    // ユーザー名の入力変更をハンドルする関数。
    // eはChangeEvent<HTMLInputElement>型で、input要素から発生したイベントを表します。
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    // ユーザー削除処理を行う非同期関数。
    // eはFormEvent<HTMLFormElement>型で、form要素から発生したイベントを表します。
    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォーム送信によるページリロードを防止
        try {
            // axios.deleteを使用してユーザー削除リクエストを送信。
            // usernameをリクエストボディとしてサーバに送ります。
            const response = await axios.delete("http://127.0.0.1:8000/api/users/delete_user/", {
                data: { username },
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (error) {
            console.log(error);
            alert('Delete failed'); // エラーが発生した場合はアラートを表示
        }
    };

    // コンポーネントがレンダリングするUI。
    // form要素にはonSubmitイベントハンドラとしてhandleDeleteを設定。
    return (
        <div>
            <h1>Delete User</h1>
            <form onSubmit={handleDelete}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={username}
                    required
                />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
};

export default DeleteUser;
