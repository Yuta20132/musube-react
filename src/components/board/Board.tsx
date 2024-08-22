import React from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';

interface Post {
    id: number;
    threads_id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
  }
interface PostListProps {
    posts: Post[];
    onPostClick: (post: Post) => void;
}




const Board: React.FC<PostListProps> = ( { posts, onPostClick } ) => {
    return (
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card variant="outlined" onClick={() => onPostClick(post)} style={{ cursor: 'pointer' }}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.content}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      By {post.user_id} on {post.user_id}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
}

export default Board
