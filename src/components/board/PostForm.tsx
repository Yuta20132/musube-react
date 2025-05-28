import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const PostForm: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [threadId, setThreadId] = useState<number>(1);
    const [categoryId, setCategoryId] = useState<string>('1');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const payload = {
            title: title.trim(),
            content: content.trim(),
            thread_id: threadId,
            category_id: categoryId.trim(),
        };

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${apiUrl}/posts/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(response.data);
            alert('Post submitted');
        }catch (error) {
            console.error('handleSubmit error:', error);
        }finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4, maxHeight: 400,maxWidth: 600, marginRight: '4rem', mb: 4, backgroundColor: '#e3f2fd', height: 'auto', borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0d47a1' }}>
                ポストの投稿
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    fullWidth
                    sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
                />
                <Box sx={{ textAlign: 'right', marginTop: 2 }}>
  <Button
    type="submit"
    variant="contained"
    sx={{
      backgroundColor: '#0d47a1',
      '&:hover': { backgroundColor: '#0b3c91' },
      minWidth: '100px',          
      height: '40px',             
      borderRadius: 2,           
      boxShadow: 1,
      fontWeight: 'bold',         
      fontSize: '1.05rem',        // 見やすく
      letterSpacing: 1,
    }}
    disabled={isSubmitting}
  >
    Post
  </Button>
</Box>

            </Box>
        </Paper>
    );
};

export default PostForm;
