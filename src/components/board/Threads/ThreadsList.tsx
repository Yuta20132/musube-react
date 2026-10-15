import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, Grid, Skeleton, Stack } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { Thread } from '../typeThreads';

const ThreadsList: React.FC<{ threads: Thread[]; loading: boolean }> = ({ threads, loading }) => {
  if (loading) return <Grid container spacing={2.5} aria-label="スレッドを読み込み中" aria-busy="true">{Array.from({ length: 6 }, (_, index) => <Grid item xs={12} sm={6} lg={4} key={index}><Card elevation={0}><CardContent><Skeleton height={32} width="80%" /><Skeleton /><Skeleton width="60%" /><Skeleton height={48} /></CardContent></Card></Grid>)}</Grid>;
  return <Grid container spacing={2.5}>{threads.map(thread => {
    const date = thread.created_at ? new Date(thread.created_at) : null;
    return <Grid item xs={12} sm={6} lg={4} key={thread.id}>
      <Card elevation={0} sx={{ height: '100%', '&:hover': { borderColor: 'primary.main' } }}>
        <CardActionArea component={RouterLink} to={`/threads/${thread.id}/view`} state={{ thread }} sx={{ height: '100%' }}>
          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', minHeight: 220 }}>
            <Typography component="h2" variant="h6" sx={{ overflowWrap: 'anywhere', mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{thread.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere', lineHeight: 1.8, mb: 3, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{thread.description}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box>{date && !Number.isNaN(date.getTime()) && <Typography component="time" dateTime={date.toISOString()} variant="caption" color="text.secondary">{date.toLocaleDateString('ja-JP')}</Typography>}</Box>
              <Stack direction="row" spacing={0.5} alignItems="center" color="primary.main"><Typography variant="body2" fontWeight={600}>スレッドを見る</Typography><ArrowForward fontSize="small" /></Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>;
  })}</Grid>;
};
export default ThreadsList;
