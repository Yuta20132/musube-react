import React, { useEffect, useState } from 'react';
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
import ThreadsView from './ThreadsView';
import { Thread } from './typeThreads';
import axios from 'axios';



const ThreadsList: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      //const token = localStorage.getItem("access_token");
      
      try {
        const response = await axios.get(
          "http://localhost:8080/threads/1",{
            withCredentials: true,
            headers: {
             // 'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data);
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
      finally {
        setLoading(false);
      }
    };
    
    fetchThreads();
  }, []);

  const handleSelectThread = (thread: Thread) => {
    setSelectedThread(thread);
  };

  const handleBack = () => {
    setSelectedThread(null);
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}
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
      ) : selectedThread ? (
        <ThreadsView thread={selectedThread} onBack={handleBack} />
      ) : threads.length === 0 ? (
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          スレッドがありません
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {threads.map((thread) => (
            <Grid item xs={12} sm={6} md={4} key={thread.id}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleSelectThread(thread)}
              >
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      sx={{ color: 'primary.dark', fontWeight: 'bold' }}
                    >
                      {thread.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                    {thread.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                      color: 'common.white',
                      borderRadius: 2,
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #21cbf3 30%, #2196f3 90%)',
                        boxShadow: '0 4px 8px 3px rgba(33, 203, 243, .4)',
                      },
                    }}
                    onClick={() => handleSelectThread(thread)}
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
