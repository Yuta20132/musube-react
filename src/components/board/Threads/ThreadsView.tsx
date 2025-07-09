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
        elevation={1}
        sx={{ 
          width: '80%', 
          maxWidth: 1000
        }}
      >
        <CardHeader
          sx={{ 
            bgcolor: 'primary.main',
            color: 'common.white',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}
          title={
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {thread ? thread.title : 'スレッドを選択してください'}
            </Typography>
          }
          action={
            <Button 
              onClick={() => navigate('/threads_page')}
              variant="outlined"
              sx={{ 
                color: 'common.white',
                borderColor: 'common.white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'common.white'
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
                variant="body1" 
                sx={{ color: 'text.secondary', mb: 3 }}
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
