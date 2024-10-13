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

interface Thread {
  title: string;
  description: string;
}

// 仮のスレッドデータ
const mockThreads: Thread[] = [
  {
    title: 'スレッド1',
    description: 'これはスレッド1の説明です。',
  },
  {
    title: 'スレッド2',
    description: 'これはスレッド2の説明です。',
  },
  {
    title: 'スレッド3',
    description: 'これはスレッド3の説明です。',
  },
];

const ThreadsList: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      // ネットワークリクエストをシミュレート
      setTimeout(() => {
        setThreads(mockThreads);
        setLoading(false);
      }, 1000); // 1秒の遅延
    };

    fetchThreads();
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 4 }}>
        スレッド一覧
      </Typography>

      {loading ? (
        <Grid container spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: 'background.paper', boxShadow: 3 }}>
                <CardHeader
                  title={
                    <Skeleton variant="text" width="60%" height={30} />
                  }
                />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : threads.length === 0 ? (
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          スレッドがありません
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {threads.map((thread, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  boxShadow: 3,
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <CardHeader
                  title={
                    <Typography variant="h6" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                      {thread.title}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {thread.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
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
