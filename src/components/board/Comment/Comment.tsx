// Comment.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList, { IComment } from './CommentList';
import { Api } from '@mui/icons-material';

interface CommentProps {
  postId: number;
}

const apiUrl = process.env.REACT_APP_API_URL;

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // 現在のログインユーザーIDを取得
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // コメント取得関数を独立させる
  const fetchComments = async () => {
    console.log(postId);
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}/comments`,{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const transformedComments = response.data.rows.map((row: any) => ({
        id: row.comment_id,
        post_id: postId,
        user_id: row.user_id,
        user_name: row.user_name,
        content: row.comment_content,
        created_at: row.comment_created_at,
      }));
      setComments(transformedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // 指定の投稿IDに紐づくコメントを取得
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // コメント削除処理
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('このコメントを削除してもよろしいですか？')) {
      return;
    }
    
    try {
      // コメントIDとユーザーIDをリクエストボディで送信
      await axios.post(`${apiUrl}/comments/delete`, {
        comment_id: commentId,
        user_id: currentUserId
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // 削除成功したら最新のコメント一覧を再取得
      await fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('コメントの削除に失敗しました');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        コメント
      </Typography>
      {/* コメント一覧を表示、現在のユーザーIDを渡す */}
      <CommentList 
        comments={comments} 
        onDeleteComment={handleDeleteComment} 
        currentUserId={currentUserId} 
      />
      {/* コメントフォーム */}
      <CommentForm postId={postId} categoryId={1} />
    </Box>
  );
};

export default Comment;
