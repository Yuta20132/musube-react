import React, { useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import PostForm from '../Post/PostForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Thread } from '../typeThreads';
import { useLocation, useNavigate } from 'react-router-dom';
import PostView, { PostViewHandle } from '../Post/PostView';

const ThreadsView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const postViewRef = useRef<PostViewHandle | null>(null);

  const thread = (location.state as { thread: Thread })?.thread;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <PostForm
        getThreadId={thread.id}
        onPostSuccess={() => {
          postViewRef.current?.fetchPosts?.();
        }}
      />
      <Card 
        sx={{ 
          width: '80%', 
          maxWidth: 1000, 
          
          background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)', 
          boxShadow: 3, 
          borderRadius: 3 
        }}
      >
        
        <CardHeader
          sx={{ 
            background: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)', 
            color: 'common.white',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          title={
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {thread ? thread.title : 'スレッドを選択してください'}
            </Typography>
          }
          action={
            <Button 
              onClick={() => navigate('/threads_page')}
              sx={{ 
                color: 'common.white', 
                background: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
              startIcon={<ArrowBackIcon />}
            >
              戻る
            </Button>
          }
        />
        <CardContent>
          {thread ? (
            <>
              <Typography 
                variant="body2" 
                sx={{ color: 'text.secondary', mb: 3, fontWeight: 'bold' }}
              >
                {thread.description}
              </Typography>
              <PostView ref={postViewRef} threadId={thread.id} />
            </>
          ) : (
            <Typography 
              variant="body1" 
              sx={{ color: 'text.secondary', textAlign: 'center' }}
            >
              スレッドを選択してください
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ThreadsView;
