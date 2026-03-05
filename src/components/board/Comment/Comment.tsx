// Comment.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommentForm from './CommentForm';
import CommentList, { IComment } from './CommentList';
import { useNotification } from '../../../contexts/NotificationContext';

interface CommentProps {
  postId: number;
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

const fetchComments = async (postId: number): Promise<IComment[]> => {
  const response = await axios.get(`${apiUrl}/posts/${postId}/comments`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.rows.map((row: any) => ({
    id: row.comment_id,
    post_id: postId,
    user_id: row.user_id,
    user_name: row.user_name,
    content: row.comment_content,
    created_at: row.comment_created_at,
  }));
};

const Comment: React.FC<CommentProps> = ({ postId }) => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const { data: currentUserId = '' } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
  });
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: Boolean(postId),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await axios.delete(`${apiUrl}/comments`, {
        data: {
          comment_id: commentId,
          user_id: currentUserId,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: async () => {
      showNotification('コメントを削除しました', 'success');
      await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
      showNotification('コメントの削除に失敗しました', 'error');
    },
  });

  const handleDeleteComment = (commentId: number) => {
    if (!window.confirm('このコメントを削除してもよろしいですか？')) {
      return;
    }

    deleteCommentMutation.mutate(commentId);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        コメント
      </Typography>
      {isCommentsLoading && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          コメントを読み込み中...
        </Typography>
      )}
      {isCommentsError && (
        <Typography variant="body2" color="error" sx={{ mb: 1 }}>
          コメントの取得に失敗しました
        </Typography>
      )}
      <CommentList 
        comments={comments} 
        onDeleteComment={handleDeleteComment} 
        currentUserId={currentUserId} 
      />
      <CommentForm
        postId={postId}
        categoryId={1}
        userId={currentUserId}
      />
    </Box>
  );
};

export default Comment;
