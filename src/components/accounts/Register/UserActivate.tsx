import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserActivate: React.FC = () => {
    const { uuid } = useParams<{ uuid: string }>();

    useEffect(() => {
        const activateUser = async () => {
            try {
                const respone = await axios.post('', {uuid});
                alert('アカウントがアクティベーㇳされました')
            } catch (error) {
                console.error(error);
                alert('アカウントのアクティベーションに失敗しました');

            }
        };
        if (uuid) {
            activateUser();
        }
    })
  return (
    <div>
        <h1>アカウントのアクティベート</h1>
    </div>
  )
}

export default UserActivate
