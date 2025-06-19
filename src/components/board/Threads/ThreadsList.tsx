import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  Skeleton,
} from '@mui/material';
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

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main', textAlign: 'center', mb: 4 }}
      >
        スレッド一覧
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={1}>
                <CardHeader
                  title={<Skeleton variant="text" width="60%" height={30} />}
                />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : threads.length === 0 ? (
        <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          スレッドがありません
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {threads.map((thread) => (
            <Grid item xs={12} sm={6} md={4} key={thread.id}>
              <Card
                elevation={1}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 200,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => handleSelectThread(thread)}
              >
                <CardHeader
                  title={
                    <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 600, textAlign: 'center' }}>
                      {thread.title}
                    </Typography>
                  }
                  sx={{ textAlign: 'center', pb: 1 }}
                />

                <CardContent sx={{ flexGrow: 1, overflowY: 'auto', pt: 0 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {thread.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectThread(thread);
                    }}
                  >
                    詳細を見る
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ThreadsList;
