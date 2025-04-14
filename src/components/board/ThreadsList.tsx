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
import { Thread } from './typeThreads';
import { useNavigate } from 'react-router-dom';

interface ThreadsListProps {
  threads: Thread[];
  loading: boolean;
}

const ThreadsList: React.FC<ThreadsListProps> = ({ threads, loading }) => {
  const navigate = useNavigate();

  const handleSelectThread = (thread: Thread) => {
    // 選択したスレッドを state として渡す
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
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
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
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 200,
                  background: 'linear-gradient(135deg, #E8EEF1 0%, #F5F7FA 100%)',
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleSelectThread(thread)}
              >
                <CardHeader
                  title={
                    <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 'bold', textAlign: 'center' }}>
                      {thread.title}
                    </Typography>
                  }
                  sx={{ textAlign: 'center' }}
                />

                <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {thread.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #304FFE 30%, #1E40FF 90%)',
                      color: 'common.white',
                      borderRadius: 2,
                      boxShadow: '0 3px 5px 2px rgba(48,79,254,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1E40FF 30%, #304FFE 90%)',
                        boxShadow: '0 4px 8px 3px rgba(48,79,254,0.4)',
                      },
                    }}
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
