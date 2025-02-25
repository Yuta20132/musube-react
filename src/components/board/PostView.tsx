import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Typography, 
  List, 
  Card,
  CardContent,
  CardActions,
  Collapse,
  Button,
  IconButton,
  Box,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comment from "./Comment/Comment";

export interface Post  {
  post_id: number;
  post_content: string;
  post_title: string;
  user_id: string;
  user_name: string;
  post_created_at: string;
};

interface Props {
  threadId?: number;
  limit?: number;
  offset?: number;
}

const PostView: React.FC<Props> = ({ threadId, limit = 5, offset = 0 }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/threads/${threadId}/posts`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            limit,
            offset,
          },
        });
        console.log(response.data.rows);
        setPosts(response.data.rows);
        setError(null);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [threadId, limit, offset]);

  const toggleComments = (postId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <List>
        {posts.length > 0 ? (
          posts.map((post) => (
            <React.Fragment key={post.post_id}>
              <Card variant="outlined" sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: 'primary.main', fontWeight: 'bold' }}
                  >
                    タイトル: {post.post_title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'primary.main', fontWeight: 'bold', mt: 1 }}
                  >
                    投稿者: {post.user_name}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {post.post_content}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    投稿日: {new Date(post.post_created_at).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => toggleComments(post.post_id)}
                    endIcon={<ExpandMoreIcon />}
                  >
                    {openComments[post.post_id] ? 'コメントを隠す' : 'コメントを表示'}
                  </Button>
                </CardActions>
                <Collapse in={openComments[post.post_id]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Comment postId={post.post_id} />
                  </CardContent>
                </Collapse>
              </Card>
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            投稿がありません
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default PostView;
