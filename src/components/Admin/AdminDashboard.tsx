import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../utils/apiClient';

type Collection = 'users' | 'threads' | 'posts' | 'comments' | 'audits';
type Row = { id: string | number; user_name?: string; email?: string; title?: string; content?: string; description?: string; category_id?: number; is_active?: boolean; suspended_at?: string; action?: string; actor_id?: string; target_type?: string; target_id?: string; created_at?: string };
const labels: Record<Collection, string> = { users: 'ユーザー', threads: 'スレッド', posts: '投稿', comments: 'コメント', audits: '操作履歴' };

export default function AdminDashboard() {
  const { userCategoryId } = useAuth();
  const [collection, setCollection] = useState<Collection>('users');
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const { data } = await apiClient.get(`/admin/${collection}`, { params: { page } });
      setRows(data.rows); setTotal(data.total);
    } catch { setRows([]); setError('取得できませんでした。管理者権限とログイン状態を確認してください。'); }
    finally { setLoading(false); }
  }, [collection, page]);
  useEffect(() => { if (userCategoryId === 5) void load(); }, [load, userCategoryId]);
  if (userCategoryId !== 5) return <Navigate to="/" replace />;
  const execute = async () => {
    if (!selected) return;
    setSaving(true); setError('');
    try {
      if (collection === 'users') await apiClient.patch(`/admin/users/${selected.id}`, { suspended: !selected.suspended_at });
      else await apiClient.delete(`/admin/${collection}/${selected.id}`);
      setSelected(null); await load();
    } catch { setError('操作できませんでした。再読み込みして状態を確認してください。'); }
    finally { setSaving(false); }
  };
  return <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>管理者画面</Typography>
    <Typography color="text.secondary" sx={{ mb: 2 }}>利用停止・再開とコンテンツの削除を行えます。操作は履歴に記録されます。</Typography>
    <Tabs value={collection} variant="scrollable" onChange={(_, value: Collection) => { setCollection(value); setPage(1); setRows([]); }}>
      {Object.entries(labels).map(([key, label]) => <Tab key={key} value={key} label={label} />)}
    </Tabs>
    {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
    {loading ? <CircularProgress aria-label="読み込み中" sx={{ my: 3 }} /> : <Stack spacing={2} sx={{ my: 3 }}>
      {rows.length === 0 && <Typography>対象のデータはありません。</Typography>}
      {rows.map(row => <Paper key={row.id} variant="outlined" sx={{ p: 2, overflowWrap: 'anywhere' }}>
        <Typography fontWeight="bold">{row.user_name || row.title || (collection === 'audits' ? `${row.action} / ${row.target_type} ${row.target_id}` : `コメント #${row.id}`)}</Typography>
        {row.email && <Typography>{row.email}</Typography>}
        {(row.content || row.description) && <Typography sx={{ whiteSpace: 'pre-wrap', my: 1 }}>{row.content || row.description}</Typography>}
        <Typography variant="caption" color="text.secondary">ID: {row.id}{row.created_at && ` / ${new Date(row.created_at).toLocaleString('ja-JP')}`}</Typography>
        {collection === 'users' && <Typography>カテゴリ: {row.category_id} / {row.suspended_at ? '利用停止中' : row.is_active ? '利用可能' : 'メール未認証'}</Typography>}
        {collection === 'audits' && <Typography>操作者: {row.actor_id}</Typography>}
        {collection !== 'audits' && <Box sx={{ mt: 1 }}><Button color={collection === 'users' && row.suspended_at ? 'primary' : 'error'} variant="outlined" disabled={collection === 'users' && row.category_id === 5} onClick={() => setSelected(row)}>{collection === 'users' ? row.suspended_at ? '利用を再開' : '利用を停止' : '削除'}</Button></Box>}
      </Paper>)}
    </Stack>}
    <Stack direction="row" spacing={2} alignItems="center"><Button disabled={page === 1 || loading} onClick={() => setPage(page - 1)}>前へ</Button><Typography>{page}ページ / 全{total}件</Typography><Button disabled={page * 50 >= total || loading} onClick={() => setPage(page + 1)}>次へ</Button></Stack>
    <Dialog open={!!selected} onClose={() => { if (!saving) setSelected(null); }}>
      <DialogTitle>操作の確認</DialogTitle><DialogContent>{collection === 'users' ? `${selected?.user_name} の利用を${selected?.suspended_at ? '再開' : '停止'}します。` : `${selected?.title || `ID: ${selected?.id}`} を削除します。関連する投稿・コメントも削除され、元に戻せません。`}</DialogContent>
      <DialogActions><Button disabled={saving} onClick={() => setSelected(null)}>キャンセル</Button><Button disabled={saving} color="error" onClick={execute}>実行</Button></DialogActions>
    </Dialog>
  </Container>;
}
