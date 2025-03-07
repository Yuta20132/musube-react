// Comment.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList, { IComment } from './CommentList';

interface CommentProps {
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // 現在のログインユーザーIDを取得
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/me', {
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

  // 指定の投稿IDに紐づくコメントを取得
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // エンドポイント例: http://localhost:8080/123/comments
        const response = await axios.get(`http://localhost:8080/posts/${postId}/comments`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        // APIからのデータ例: { rows: [{ comment_id, comment_content, user_id, user_name, comment_created_at }, ...] }
        const transformedComments = response.data.rows.map((row: any) => ({
          id: row.comment_id,
          post_id: postId,
          user_id: row.user_id,
          content: row.comment_content,
          created_at: row.comment_created_at,
        }));
        setComments(transformedComments);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // コメント削除処理
  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm('このコメントを削除してもよろしいですか？')) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:8080/comments/${commentId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // 削除成功したらコメントリストから該当コメントを削除
      setComments(comments.filter(comment => comment.id !== commentId));
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
