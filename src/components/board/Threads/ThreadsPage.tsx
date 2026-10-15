import React, { useMemo, useState } from 'react';
import ThreadsList from './ThreadsList';
import ThreadsCreate from './ThreadsCreate';
import { Box, Typography, Container, Paper, Button, TextField, InputAdornment, Stack, Alert, MenuItem, IconButton, Tabs, Tab } from '@mui/material';
import { Add, Search, Close, ForumOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../typeThreads';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { BOARD_LABELS, canAccessCategory, CategoryId, getAccessibleCategoryIds, parseCategoryId } from '../../../utils/categoryAccess';

const apiUrl = process.env.REACT_APP_API_URL;
const ThreadsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { userCategoryId } = useAuth();
  const selectedCategoryId = parseCategoryId(categoryId);
  const shouldRedirect = !selectedCategoryId || !canAccessCategory(selectedCategoryId, userCategoryId);
  const currentCategoryId: CategoryId = selectedCategoryId ?? 1;
  const accessibleCategoryIds = useMemo(() => getAccessibleCategoryIds(userCategoryId), [userCategoryId]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'alphabetical'>('newest');
  const { data: allThreads = [], isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ['threads', currentCategoryId],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/threads/${currentCategoryId}`, {
        params: { limit: 10, offset: 0 },
        headers: { 'Content-Type': 'application/json' }, withCredentials: true,
      });
      return Array.isArray(response.data) ? response.data as Thread[] : [];
    },
    enabled: !shouldRedirect,
  });
  const threads = useMemo(() => {
    const term = searchTerm.trim().toLocaleLowerCase('ja');
    return allThreads.filter(thread => `${thread.title}\n${thread.description}`.toLocaleLowerCase('ja').includes(term))
      .sort((a, b) => sortBy === 'alphabetical' ? a.title.localeCompare(b.title, 'ja') : (Date.parse(b.created_at || '') || 0) - (Date.parse(a.created_at || '') || 0));
  }, [allThreads, searchTerm, sortBy]);

  if (shouldRedirect) return <Navigate to="/threads_page/1" replace />;
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center"><ForumOutlined color="primary" /><Typography variant="h4" component="h1">{BOARD_LABELS[currentCategoryId]}</Typography></Stack>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>気になる話題を見つけて、質問やアイデアを共有しましょう。</Typography>
        </Box>
        <Button variant="contained" startIcon={showCreateForm ? <Close /> : <Add />} onClick={() => setShowCreateForm(value => !value)} aria-expanded={showCreateForm} aria-controls="thread-create-form" sx={{ flexShrink: 0 }}>
          {showCreateForm ? '作成フォームを閉じる' : 'スレッドを作成'}
        </Button>
      </Stack>
      <Tabs value={currentCategoryId} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label="掲示板を選ぶ" sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        {accessibleCategoryIds.map(id => <Tab key={id} value={id} label={BOARD_LABELS[id]} component={RouterLink} to={`/threads_page/${id}`} />)}
      </Tabs>
      {showCreateForm && <Box id="thread-create-form" sx={{ mb: 3 }}>
        <ThreadsCreate onThreadSuccess={() => setShowCreateForm(false)} onCancel={() => setShowCreateForm(false)} accessibleCategoryIds={accessibleCategoryIds} initialCategoryId={currentCategoryId} />
      </Box>}
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField fullWidth label="スレッドを検索" placeholder="タイトル・説明のキーワード" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} InputProps={{
            startAdornment: <InputAdornment position="start"><Search color="primary" /></InputAdornment>,
            endAdornment: searchTerm ? <InputAdornment position="end"><IconButton aria-label="検索条件をクリア" onClick={() => setSearchTerm('')} edge="end"><Close /></IconButton></InputAdornment> : undefined,
          }} />
          <TextField select label="並び順" value={sortBy} onChange={event => setSortBy(event.target.value as typeof sortBy)} sx={{ minWidth: 160 }}>
            <MenuItem value="newest">新着順</MenuItem><MenuItem value="alphabetical">タイトル順</MenuItem>
          </TextField>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>表示中のスレッド（最大10件）のタイトル・説明から検索します。</Typography>
      </Paper>
      {isError ? <Alert severity="error" action={<Button color="inherit" disabled={isFetching} onClick={() => void refetch()}>{isFetching ? '再取得中…' : '再試行'}</Button>}>スレッドを読み込めませんでした。接続を確認して再試行してください。</Alert> : <>
        <Typography role="status" variant="body2" color="text.secondary" sx={{ mb: 2 }}>{isLoading ? 'スレッドを読み込んでいます…' : searchTerm.trim() ? `「${searchTerm.trim()}」の検索結果：${threads.length}件` : `${threads.length}件のスレッド`}</Typography>
        {!isLoading && threads.length === 0 ? <Paper elevation={0} sx={{ p: { xs: 3, sm: 6 }, textAlign: 'center' }}>
          <ForumOutlined sx={{ color: 'text.secondary', fontSize: 36, mb: 1 }} />
          <Typography variant="h6" component="h2">{searchTerm.trim() ? '一致するスレッドがありません' : 'まだスレッドがありません'}</Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 1, mb: 3 }}>{searchTerm.trim() ? '別のキーワードを試すか、検索条件をクリアしてください。' : '最初の質問やアイデアを投稿して、会話を始めましょう。'}</Typography>
          <Button variant="outlined" onClick={() => searchTerm.trim() ? setSearchTerm('') : setShowCreateForm(true)}>{searchTerm.trim() ? '検索条件をクリア' : 'スレッドを作成'}</Button>
        </Paper> : <ThreadsList threads={threads} loading={isLoading} />}
      </>}
    </Container>
  );
};
export default ThreadsPage;
