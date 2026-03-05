import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, InputAdornment, Alert } from '@mui/material';
import { Title as TitleIcon, Create as CreateIcon } from '@mui/icons-material';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { validateAndSanitizePost } from '../../../utils/validation';
import { useNotification } from '../../../contexts/NotificationContext';
type Props = {
    getThreadId: number;
    categoryId?: number;
    onPostSuccess?: () => void;
}
const PostForm: React.FC<Props> = ({ getThreadId, categoryId = 1, onPostSuccess }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const createPostMutation = useMutation({
        mutationFn: async (payload: {
            title: string;
            content: string;
            thread_id: number;
            category_id: number;
        }) => {
            await axios.post(`${apiUrl}/posts/`, payload, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
        },
        onSuccess: async () => {
            showNotification('投稿を作成しました', 'success');
            setTitle('');
            setContent('');
            setValidationErrors([]);
            await queryClient.invalidateQueries({ queryKey: ['posts', getThreadId] });
            onPostSuccess?.();
        },
        onError: () => {
            setValidationErrors(['投稿に失敗しました。もう一度お試しください。']);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationErrors([]);
        
        // 入力値の検証とサニタイズ
        const validation = validateAndSanitizePost(title, content);
        
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }
        
        const payload = {
            title: validation.sanitizedTitle,
            content: validation.sanitizedContent,
            thread_id: getThreadId,
            category_id: categoryId,
        };

        createPostMutation.mutate(payload);
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, mb: 3 }}>
                    ポストの投稿
                </Typography>
            {validationErrors.length > 0 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {validationErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    required
                    fullWidth
                    inputProps={{ maxLength: 100 }}
                    helperText={`${title.length}/100文字`}
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
                    inputProps={{ maxLength: 1000 }}
                    helperText={`${content.length}/1000文字`}
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
                        disabled={createPostMutation.isPending}
                        size="large"
                        sx={{ px: 4 }}
                    >
                        {createPostMutation.isPending ? '投稿中...' : '投稿'}
                    </Button>
                </Box>
            </Box>
            </Paper>
        </Box>
    );
};

export default PostForm;
