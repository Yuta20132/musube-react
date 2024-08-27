import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const UserActivate: React.FC = () => {
    const location = useLocation();
    console.log(location.search)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id')
        const activateUser = async () => {
            try {
                const respone = await axios.post(`http://localhost:8080/users/validate/?id=${id}`);
                alert('アカウントがアクティベーㇳされました')
                console.log(respone)
            } catch (error) {
                console.error(error);
                alert('アカウントのアクティベーションに失敗しました');

            }
        };
    
        activateUser();
        
    },[location.search])
  return (
    <div>
        <h1>アカウントのアクティベート</h1>

    </div>
  )
}

export default UserActivate
