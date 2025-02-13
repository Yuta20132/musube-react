import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() === '') return;
    onSubmit(content);
    setContent('');
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
