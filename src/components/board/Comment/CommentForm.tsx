import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../../contexts/NotificationContext';

interface CommentFormProps {
  postId: number;
  categoryId: number;
  userId?: string;
  onCommentSuccess?: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  categoryId = 1,
  userId,
  onCommentSuccess, 
}) => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const createCommentMutation = useMutation({
    mutationFn: async (commentContent: string) => {
      await axios.post(
        `${apiUrl}/comments`,
        {
          post_id: postId,
          category_id: categoryId,
          content: commentContent,
          user_id: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      showNotification('コメントを投稿しました', 'success');
      setContent('');
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      onCommentSuccess?.();
    },
    onError: (error) => {
      console.error('Error posting comment:', error);
      showNotification('コメントの投稿に失敗しました', 'error');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') return;
    createCommentMutation.mutate(content);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        label="コメントを入力"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={createCommentMutation.isPending}
        sx={{ whiteSpace: 'nowrap' }}
      >
        {createCommentMutation.isPending ? '投稿中...' : '投稿'}
      </Button>
    </Box>
  );
};

export default CommentForm;
