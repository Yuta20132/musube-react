import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, InputAdornment } from '@mui/material';
import { Title as TitleIcon, Create as CreateIcon } from '@mui/icons-material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
type Props = {
    getThreadId: number;
    onPostSuccess?: () => void;
}
const PostForm: React.FC<Props> = ({getThreadId, onPostSuccess}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [threadId, setThreadId] = useState<number>(getThreadId);
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
            if (onPostSuccess) {
                onPostSuccess();
            }
            setTitle('');
            setContent('');
        }catch (error) {
            console.error('handleSubmit error:', error);
        }finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Paper elevation={1} sx={{ padding: 3, marginTop: 4, maxHeight: 400, maxWidth: 600, marginRight: '4rem', mb: 4, height: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}>
                ポストの投稿
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TitleIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="内容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CreateIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        size="large"
                        sx={{ px: 4 }}
                    >
                        {isSubmitting ? '投稿中...' : '投稿'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default PostForm;
