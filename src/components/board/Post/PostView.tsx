import React, { useImperativeHandle, forwardRef, useMemo, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Comment from "../Comment/Comment";
import PostSearch from "./PostSearch";
import { useNotification } from '../../../contexts/NotificationContext';

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

export interface PostViewHandle {
  fetchPosts: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const fetchCurrentUser = async (): Promise<string> => {
  const response = await axios.get(`${apiUrl}/users/me`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.id;
};

const fetchPosts = async (
  threadId: number,
  limit: number,
  offset: number
): Promise<Post[]> => {
  const response = await axios.get(`${apiUrl}/threads/${threadId}/posts`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      limit,
      offset,
    },
  });

  return response.data.rows;
};

const PostView = forwardRef<PostViewHandle, Props>(
  ({ threadId, limit = 5, offset = 0 }, ref) => {

  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const [openComments, setOpenComments] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: currentUserId = '' } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: allPosts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ['posts', threadId, limit, offset],
    queryFn: async () => {
      if (!threadId) return [];
      return fetchPosts(threadId, limit, offset);
    },
    enabled: Boolean(threadId),
  });

  useImperativeHandle(
    ref,
    () => ({
      fetchPosts: () => {
        void refetchPosts();
      },
    }),
    [refetchPosts]
  );

  const deletePostMutation = useMutation({
    mutationFn: async (params: { postId: number; userId: string }) => {
      await axios.delete(`${apiUrl}/posts/`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          post_id: params.postId,
          user_id: params.userId,
        },
      });
    },
    onSuccess: async () => {
      showNotification('投稿を削除しました', 'success');
      setDeleteError(null);
      if (threadId) {
        await queryClient.invalidateQueries({ queryKey: ['posts', threadId] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
    onError: (error) => {
      console.error('Error deleting post:', error);
      setDeleteError('投稿の削除に失敗しました');
    },
  });

  const deletePost = (postId: number, userId: string) => {
    if (!window.confirm('この投稿を削除してもよろしいですか？')) {
      return;
    }

    deletePostMutation.mutate({ postId, userId });
  };

  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPosts;
    }

    const term = searchTerm.toLowerCase();
    return allPosts.filter((post) =>
      post.post_title.toLowerCase().includes(term) ||
      post.post_content.toLowerCase().includes(term)
    );
  }, [allPosts, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const toggleComments = (postId: number) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  const error = deleteError || (isPostsError ? '投稿の取得に失敗しました' : null);

  return (
    <Box sx={{ mt: 2 }}>
      <PostSearch onSearch={handleSearch} />
      
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {isPostsLoading && (
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          投稿を読み込み中...
        </Typography>
      )}
      
      <List sx={{ mt: 2 }}>
        {!isPostsLoading && filteredPosts.length > 0 ? (
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
                      disabled={deletePostMutation.isPending}
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
        ) : !isPostsLoading ? (
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {searchTerm ? `「${searchTerm}」に一致する投稿はありません` : '投稿がありません'}
          </Typography>
        ) : null}
      </List>
    </Box>
  );
});

export default PostView;
