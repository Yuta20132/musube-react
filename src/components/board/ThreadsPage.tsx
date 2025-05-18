import React, { useState, useEffect } from 'react';
import ThreadsList from './ThreadsList';
import ThreadsCreate from './ThreadsCreate';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import ThreadsSearch from './Threads/ThreadsSearch';
import { Thread } from './typeThreads';

const apiUrl = process.env.REACT_APP_API_URL;

const ThreadsPage: React.FC = () => {
  // 取得した全スレッドと表示用のスレッドの両方を状態管理
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 全件のスレッドを取得
  const fetchThreads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/threads/1`, {
        withCredentials: true,
      });
      setAllThreads(response.data);
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  // 新しいスレッド作成時、全件および表示用の配列に追加
  const handleCreateThread = async (newThread: { title: string; description: string; memberType: string }) => {
    try {
      const response = await axios.post(`${apiUrl}/threads`, newThread, {
        withCredentials: true,
      });
      const updatedThreads = [...allThreads, response.data];
      setAllThreads(updatedThreads);
      setThreads(updatedThreads);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  // クライアント側で検索フィルタリングを実装
  const handleSearchThreads = (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (!trimmedSearchTerm) {
      // キーワードが空の場合は全件表示
      setThreads(allThreads);
    } else {
      // タイトルまたは説明にキーワードが含まれるスレッドのみ表示
      const filteredThreads = allThreads.filter(thread =>
        thread.title.toLowerCase().includes(trimmedSearchTerm) ||
        thread.description.toLowerCase().includes(trimmedSearchTerm)
      );
      setThreads(filteredThreads);
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'primary.main', textAlign: 'center', mb: 4 }}
      >
        掲示板
      </Typography>
      <ThreadsCreate onSubmit={handleCreateThread} />
      {/* ThreadsSearch に onSearch プロパティとして handleSearchThreads を渡す */}
      <ThreadsSearch onSearch={handleSearchThreads} />
      <ThreadsList threads={threads} loading={loading} />
    </Box>
  );
};

export default ThreadsPage;

