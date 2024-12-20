import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  List, 
  ListItem, 
  Divider, 
  Button, 
  Box 
} from '@mui/material';
import PostForm from './PostForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Thread, Post } from './typeThreads';

type Props = {
  thread: Thread | null;
  posts: Post[];
  onBack: () => void;
};

const ThreadsView: React.FC<Props> = ({ thread, posts,onBack }) => {
  const handlePostSubmit = (title: string, content: string, threadId: string, categoryId: string) => {
};

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
      <PostForm/>
      <Card 
        sx={{ 
          width: '100%', 
          maxWidth: 800, 
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
              onClick={onBack} 
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
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontWeight: 'bold' }}>
                {thread.description}
              </Typography>
              <List sx={{ mt: 2 }}>
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <React.Fragment key={post.id}>
                      <ListItem alignItems="flex-start" sx={{ display: 'block', paddingLeft: 0, paddingRight: 0 }}>
                        <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          投稿者: {post.user_id}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {post.content}
                        </Typography>
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
            </>
          ) : (
            <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              スレッドを選択してください
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ThreadsView;
