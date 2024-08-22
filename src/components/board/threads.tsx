import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Typography, Modal, Box } from '@mui/material';
import Board from './Board';
import mockData from '../mockData';
import PostForm from './PostForm';


interface Post {
    id: number;
    threads_id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
  }
  

const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ff4081',
      },
      background: {
        default: '#f5f5f5',
      },
    },
    typography: {
      h3: {
        fontFamily: 'Roboto, sans-serif',
      },
    },
  });
  

const Threads = () => {
    const [posts, setPosts] = useState<Post[]>(mockData);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handleOpen = (post: Post) => {
        setSelectedPost(post);
    };

    const handleClose = () => {
        setSelectedPost(null);
    };

    const handleSubmit = (title: string, content: string) => {
        const newPost: Post = {
            id: posts.length +1,
            threads_id: 106,
            user_id:1,//ここはAPIとつなぎ込み後
            title,
            content,
            created_at: new Date().toISOString(),
        };
        setPosts([...posts, newPost]);
    };


  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography variant="h3" align="center" gutterBottom>
            掲示板
        </Typography>
        <PostForm onSubmit={handleSubmit} />
        <Board posts={mockData} onPostClick={handleOpen}/>

        <Modal
            open={Boolean(selectedPost)}
            onClose={handleClose}
            aria-label='psot-modal-title'
            aria-describedby='post-modal-description'
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                { selectedPost && (
                    <>
                        <Typography id="post-modal-title" variant="h6" component="h2">
                            {selectedPost.title}
                        </Typography>
                        <Typography id="post-modal-description" sx={{ mt:2 }}>
                            {selectedPost.content}
                        </Typography>
                        <Typography variant='caption' display="block" gutterBottom sx={{ mt:2 }}>
                            By User {selectedPost.user_id} on {selectedPost.created_at}
                        </Typography>
                    </>)}
            </Box>
        </Modal>

    </ThemeProvider>
  )
}

export default Threads
