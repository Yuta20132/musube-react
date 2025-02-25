import React, { useState } from 'react';
import ThreadsList from './ThreadsList';
import ThreadsCreate from './ThreadsCreate';
import { Box, Typography } from '@mui/material';

interface Thread {
  title: string;
  description: string;
}

const ThreadsPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const handleCreateThread = (newThread: Thread) => {
    setThreads([newThread, ...threads]); // Add the new thread at the top
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3, backgroundColor: 'background.default', borderRadius: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main', textAlign: 'center', mb: 4 }}
      >
        掲示板
      </Typography>
      <ThreadsCreate onSubmit={handleCreateThread} />
      <ThreadsList />
    </Box>
  );
};

export default ThreadsPage;
