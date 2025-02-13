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

  // 指定の投稿IDに紐づくコメントを取得
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // エンドポイント例: http://localhost:8080/123/comments
        const response = await axios.get(`/${postId}/comments`);
        // response.data は IComment[] として返ってくる想定
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  // 新規コメント投稿時の処理
  const handleAddComment = async (content: string) => {
    try {
      // POST 送信例（必要に応じ URL や payload を調整してください）
      const response = await axios.post(`/${postId}/comments`, { content });
      // API が新規コメントデータを返す場合、状態に追加
      setComments((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        コメント
      </Typography>
      <CommentForm onSubmit={handleAddComment} />
      {loading ? (
        <Typography>コメントを取得中...</Typography>
      ) : (
        <CommentList comments={comments} />
      )}
    </Box>
  );
};

export default Comment;
