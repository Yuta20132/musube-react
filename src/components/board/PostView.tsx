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
import PostSearch from "./Post/PostSearch";

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
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [threadId, limit, offset]);

  // 検索条件が変わったら投稿をフィルタリング
  useEffect(() => {
    filterPosts();
  }, [searchTerm, allPosts]);

  // 投稿のフィルタリング関数
  const filterPosts = () => {
    if (!searchTerm.trim()) {
      setFilteredPosts(allPosts);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allPosts.filter(post => 
      post.post_title.toLowerCase().includes(term) || 
      post.post_content.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

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
          // 検索パラメータは送信しない
        },
      });
      
      const posts = response.data.rows;
      console.log(posts);
      setAllPosts(posts);
      setFilteredPosts(posts); // 初期状態では全ての投稿を表示
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('投稿の取得に失敗しました');
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const toggleComments = (postId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <PostSearch onSearch={handleSearch} />
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      
      <List sx={{ mt: 2 }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
            {searchTerm ? `「${searchTerm}」に一致する投稿はありません` : '投稿がありません'}
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default PostView;
