import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

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
  const [content, setContent] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') return;

    try {
      await axios.post(
        `${apiUrl}/comments`,
        {
          post_id: postId,
          category_id: categoryId,
          content: content,
          user_id: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      setContent('');
      if (onCommentSuccess) {
        onCommentSuccess();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
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
      <Button type="submit" variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }} >
        投稿
      </Button>
    </Box>
  );
};

export default CommentForm;
