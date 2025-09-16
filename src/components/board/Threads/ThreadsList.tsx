import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Skeleton,
  Chip,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  ChatBubbleOutline as ChatIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { Thread } from '../typeThreads';
import { useNavigate } from 'react-router-dom';

interface ThreadsListProps {
  threads: Thread[];
  loading: boolean;
}

const ThreadsList: React.FC<ThreadsListProps> = ({ threads, loading }) => {
  const navigate = useNavigate();

  const handleSelectThread = (thread: Thread) => {
    navigate('/threads/view', { state: { thread } });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '不明';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '今日';
    if (diffDays === 2) return '昨日';
    if (diffDays <= 7) return `${diffDays - 1}日前`;
    return date.toLocaleDateString('ja-JP');
  };

  const getRandomStats = () => ({
    posts: Math.floor(Math.random() * 50) + 1,
    views: Math.floor(Math.random() * 500) + 10,
    participants: Math.floor(Math.random() * 20) + 1,
  });

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Card elevation={1}>
              <CardContent>
                <Stack spacing={2}>
                  <Skeleton variant="text" width="80%" height={28} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Stack direction="row" spacing={2}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (threads.length === 0) {
    return (
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          px: 3,
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          スレッドが見つかりませんでした
        </Typography>
        <Typography variant="body2" color="text.secondary">
          新しいスレッドを作成して議論を始めましょう
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {threads.map((thread) => {
        const stats = getRandomStats();
        return (
          <Grid item xs={12} sm={6} lg={4} key={thread.id}>
            <Card
              elevation={1}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
              onClick={() => handleSelectThread(thread)}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* ヘッダー部分 */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {thread.title}
                  </Typography>
                  <Chip 
                    size="small" 
                    label="アクティブ" 
                    color="success" 
                    variant="outlined"
                    sx={{ ml: 1, flexShrink: 0 }}
                  />
                </Stack>

                {/* 説明文 */}
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 3,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.5,
                  }}
                >
                  {thread.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectThread(thread);
                  }}
                  sx={{ 
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  スレッドを見る
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ThreadsList;
