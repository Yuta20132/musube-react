import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

interface CommentFormProps {
  //onSubmit: (content: string) => void;
  postId: number;
  categoryId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({postId, categoryId=1 }) => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<string>('');

  const fetchUserId = async () => {

    try {
      const response = await axios.get('http://localhost:8080/users/me', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data);
      console.log(response.data.id);
      return response.data.id;
    } catch (error) {
      console.error('fetchData error:', error);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await fetchUserId();
        setUserId(id);
      } catch (err) {
        // エラー時の処理
        console.error('Error getting userId:', err);
      }
    };

    getUserId();
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Comment posted:',
      {
          post_id: postId,
          category_id: categoryId,
          content: content,
          user_id: userId,
        },
      );
    if (content.trim() === '') return;

    try {
      await axios.post(
        'http://localhost:8080/comments',
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
      
      //onSubmit(content);
      setContent('');
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
      <Button type="submit" variant="contained" color="primary">
        投稿
      </Button>
    </Box>
  );
};

export default CommentForm;
