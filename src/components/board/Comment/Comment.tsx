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
        const response = await axios.get(`http://loccalhost:8080/${postId}/comments`);
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
      // 新規コメントのペイロードを作成
      const newCommentPayload = {
        post_id: postId,
        category_id: 1, // 必要に応じて値を変更してください
        content: content,
        user_id: "fc395ca1-a98a-46af-b98e-a1358fd0d011", // ログインユーザーのIDを利用してください
      };

      // POSTリクエスト送信
      const response = await axios.post('http://localhost:8080/comments/', newCommentPayload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // APIが新規コメントデータを返す場合、そのデータを状態に追加
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
