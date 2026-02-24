import React, { useState, useEffect } from 'react';
import ThreadsList from './ThreadsList';
import ThreadsCreate from './ThreadsCreate';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button, 
  TextField, 
  InputAdornment,
  Chip,
  Stack,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Forum as ForumIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import axios from 'axios';
import { Thread } from '../typeThreads';

const apiUrl = process.env.REACT_APP_API_URL;

const ThreadsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'alphabetical'>('newest');


  const fetchThreads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/threads/1`, {
        params: {
          limit: 10,
          offset: 0,
        },
        headers: {
            'Content-Type': 'application/json',
          },
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

  // 検索とソートの処理
  useEffect(() => {
    let filteredThreads = [...allThreads];
    
    // 検索フィルタリング
    if (searchTerm.trim()) {
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();
      filteredThreads = filteredThreads.filter(thread =>
        thread.title.toLowerCase().includes(trimmedSearchTerm) ||
        thread.description.toLowerCase().includes(trimmedSearchTerm)
      );
    }
    
    // ソート
    switch (sortBy) {
      case 'newest':
        filteredThreads.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
        break;
      case 'alphabetical':
        filteredThreads.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
        // 投稿数でソート（仮実装）
        filteredThreads.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
    }
    
    setThreads(filteredThreads);
  }, [allThreads, searchTerm, sortBy]);

  const handleCreateSuccess = () => {
    fetchThreads();
    setShowCreateForm(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'newest': return '新着順';
      case 'popular': return '人気順';
      case 'alphabetical': return 'あいうえお順';
      default: return '新着順';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* ヘッダーセクション */}
      <Box
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        })}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'center', md: 'flex-start' }}
              spacing={3}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <ForumIcon sx={{ fontSize: 40 }} />
                  <Typography variant="h3" component="h1" sx={{ fontWeight: 800 }}>
                    掲示板
                  </Typography>
                </Stack>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  コミュニティで情報を共有しよう
                </Typography>
                <Stack direction="row" spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PeopleIcon sx={{ fontSize: 20 }} />
                    <Typography variant="body2">{allThreads.length} スレッド</Typography>
                  </Stack>
                </Stack>
              </Box>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setShowCreateForm(!showCreateForm)}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                新規スレッド作成
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* スレッド作成フォーム */}
        {showCreateForm && (
          <Fade in={showCreateForm}>
            <Box sx={{ mb: 4 }}>
              <ThreadsCreate onThreadSuccess={handleCreateSuccess} />
            </Box>
          </Fade>
        )}

        {/* アクションバー */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            mb: 4,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3} 
            alignItems={{ xs: 'stretch', md: 'center' }}
          >
            {/* 検索バー */}
            <TextField
              placeholder="スレッドを検索..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="medium"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            {/* ソートオプション */}
            <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
              <Typography variant="body2" sx={{ alignSelf: 'center', color: 'text.secondary', mr: 1 }}>
                並び順:
              </Typography>
              {(['newest', 'popular', 'alphabetical'] as const).map((sort) => (
                <Chip
                  key={sort}
                  label={getSortLabel(sort)}
                  variant={sortBy === sort ? 'filled' : 'outlined'}
                  color={sortBy === sort ? 'primary' : 'default'}
                  onClick={() => setSortBy(sort)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </Stack>
          
          {/* 検索結果表示 */}
          {searchTerm && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                "{searchTerm}" の検索結果: {threads.length} 件
              </Typography>
            </Box>
          )}
        </Paper>

        {/* スレッド一覧 */}
        <ThreadsList threads={threads} loading={loading} />
      </Container>
    </Box>
  );
};

export default ThreadsPage;
