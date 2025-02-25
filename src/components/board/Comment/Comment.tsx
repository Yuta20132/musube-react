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
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);


  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        コメント
      </Typography>
      {/* コメント一覧を表示 */}
      <CommentList comments={comments} />
      {/* コメントフォーム */}
      <CommentForm postId={postId} categoryId={1} />
      
    </Box>
  );
};

export default Comment;
