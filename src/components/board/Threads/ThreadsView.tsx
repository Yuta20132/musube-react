import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Stack,
  Collapse
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Forum as ForumIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import PostForm from '../Post/PostForm';
import { Thread } from '../typeThreads';
import { useLocation, useNavigate } from 'react-router-dom';
import PostView from '../Post/PostView';

const ThreadsView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState<boolean>(false);

  const thread = (location.state as { thread: Thread })?.thread;

  const handlePostSuccess = () => {
    setShowPostForm(false);
  };

  if (!thread) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          スレッドを選択してください
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Thread Header Section */}
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
                    {thread.title}
                  </Typography>
                </Stack>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  {thread.description}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(`/threads_page/${thread.category_id ?? 1}`)}
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
                掲示板に戻る
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Action Bar */}
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
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              投稿一覧
            </Typography>

            <Button
              variant={showPostForm ? 'outlined' : 'contained'}
              startIcon={<AddIcon />}
              onClick={() => setShowPostForm(!showPostForm)}
              sx={{
                px: 3,
                py: 1.5,
              }}
            >
              {showPostForm ? '投稿をキャンセル' : '新しい投稿を作成'}
            </Button>
          </Stack>
        </Paper>

        {/* Collapsible Post Form */}
        <Collapse in={showPostForm}>
          <Box sx={{ mb: 4 }}>
            <PostForm
              getThreadId={thread.id}
              categoryId={thread.category_id ?? 1}
              onPostSuccess={handlePostSuccess}
            />
          </Box>
        </Collapse>

        {/* Posts Display */}
        <Box>
          <PostView threadId={thread.id} />
        </Box>
      </Container>
    </Box>
  );
}

export default ThreadsView;
