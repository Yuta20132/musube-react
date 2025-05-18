import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const UserActivate: React.FC = () => {
    const location = useLocation();
    console.log(location.search);

    const navigate = useNavigate();

    const handleLoginForm = () => {
        navigate("/login");
    }

    // 状態管理用のフックを追加
    const [activationStatus, setActivationStatus] = useState<'pending' | 'success' | 'error'>('pending');


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token')
        const activateUser = async () => {
            try {

                //成功したときの処理
                const respone = await axios.post(`${apiUrl}/users/verify/`,{
                    token: token,
                });
                setActivationStatus('success');
                alert('アカウントがアクティベーㇳされました');
            } catch (error) {

                //エラーのときの表示
                console.error(error);
                setActivationStatus('error');
                alert('アカウントのアクティベーションに失敗しました');

            }
        };
    
        activateUser();
        
    },[location.search])
  return (
    <div>
        <h1>アカウントのアクティベート</h1>
        {/* 状態に応じて表示を切り替える */}

        {activationStatus === 'pending' && (
            /* アクティベート待ちの表示 */
            <p>アカウントをアクティベート中です...</p>
        )}

        {activationStatus === 'success' && (
            /* アクティベートが成功したときの表示 */
            <div>
                <p>アカウントが正常にアクティベートされました。</p>
                <button onClick={handleLoginForm}>ログインページへ</button>
            </div>
        )}

        {activationStatus === 'error' && (
            /* アクティベートが失敗したときの表示  */
            <div>
                <p>アカウントのアクティベーションに失敗しました。再度お試しください。</p>
            </div>
        )}
    </div>
  )
}

export default UserActivate;
