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
  Box,
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

const apiUrl = process.env.REACT_APP_API_URL;

const PostView: React.FC<Props> = ({ threadId, limit = 5, offset = 0 }) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    fetchCurrentUser();
    fetchPosts();
  }, [threadId, limit, offset]);

  // 検索条件が変わったら投稿をフィルタリング
  useEffect(() => {
    filterPosts();
  }, [searchTerm, allPosts]);

  // 現在のログインユーザー情報を取得
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/me`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCurrentUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };


  // 投稿削除機能
  const deletePost = async (postId: number, userId: string) => {
    if (!window.confirm('この投稿を削除してもよろしいですか？')) {
      return;
    }
    
    try {
      await axios.delete(`${apiUrl}/posts/`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          post_id: postId,
          user_id: userId
        }
      });
      
      // 削除成功後、投稿リストを更新
      setAllPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
      setFilteredPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('投稿の削除に失敗しました');
    }
  };

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
      const response = await axios.get(`${apiUrl}/threads/${threadId}/posts`, {
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
      setAllPosts(posts);
      setFilteredPosts(posts); 
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
                  
                  {currentUserId === post.user_id && (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deletePost(post.post_id, post.user_id)}
                      sx={{ ml: 'auto' }}
                    >
                      削除
                    </Button>
                  )}
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
