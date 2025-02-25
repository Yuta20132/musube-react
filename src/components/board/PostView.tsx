import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Typography, 
  List, 
  ListItem, 
  Divider,
  Box, 
  Button,
  ButtonBase
} from '@mui/material';
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
    <div>
    <List sx={{ mt: 2 }}>
                    {posts.length > 0 ? (
                      posts.map((post) => (
                        <React.Fragment key={post.post_id}>
                          <ListItem alignItems="flex-start" sx={{ display: 'block', paddingLeft: 0, paddingRight: 0 }}>
                          <Typography
                            variant="subtitle2"
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
                          <Box sx={{ mt: 1 }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => toggleComments(post.post_id)}>
                               {openComments[post.post_id] ? 'コメントを隠す' : 'コメントを表示'}
                            </Button>
                          </Box>
                          {openComments[post.post_id] && (
                          <Box sx={{ mt: 2, ml: 2 }}>
                            <Comment postId={post.post_id} />
                          </Box>
                          )}
                          </ListItem>
                          <Divider sx={{ my: 2 }} />
                        </React.Fragment>
                      ))
                    ) : (
                      <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                        投稿がありません
                      </Typography>
                    )}
                  </List>
  </div>
  )
}

export default PostView
