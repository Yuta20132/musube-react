import React, {useState} from 'react'
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

interface PostFormProps {
    onSubmit: (title: string, content: string) => void;
    //IDなどはのちに加える
}

const PostForm: React.FC<PostFormProps> = ({onSubmit}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onSubmit(title, content);
            setTitle('');
            setContent('');
        }
    }

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 4, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Create a New Post
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                fullWidth={false}
                sx={{ width: '100%', maxWidth: 500 }}
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
                fullWidth={false}
                sx={{ width: '100%', maxWidth: 500 }}
                />
                <Box sx={{ textAlign: 'right', marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Post
                </Button>
                </Box>
            </Box>
            </Paper>
        );
}

export default PostForm
