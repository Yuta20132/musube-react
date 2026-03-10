import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Business as BusinessIcon,
  ChevronRight as ChevronRightIcon,
  LocalHospital as LocalHospitalIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import apiClient from '../../utils/apiClient';
import SearchDetailModal from './SearchDetailModal';
import { SearchResult } from './SearchTypes';

interface SearchApiRow {
  id?: unknown;
  user_name?: unknown;
  category?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  institution?: unknown;
  description?: unknown;
}

interface SearchApiResponse {
  rowCount?: unknown;
  rows?: SearchApiRow[];
}

const normalizeCategory = (category: string): string => {
  const value = category.trim();
  if (!value) return '一般';
  if (value.includes('大学') || value.includes('研究') || value === 'Academic') return '大学・研究所';
  if (value.includes('企業') || value === 'Corporate') return '企業';
  if (value.includes('医') || value === 'Medical') return '医者';
  if (value.includes('管理') || value === 'Admin' || value === 'Administrator') return '管理者';
  if (value === 'General') return '一般';
  return value;
};

const getCategoryIcon = (category: string) => {
  if (category.includes('大学') || category.includes('研究')) return <SchoolIcon fontSize="small" />;
  if (category.includes('企業')) return <BusinessIcon fontSize="small" />;
  if (category.includes('医')) return <LocalHospitalIcon fontSize="small" />;
  if (category.includes('管理')) return <AdminPanelSettingsIcon fontSize="small" />;
  return <PersonIcon fontSize="small" />;
};

const toSearchResult = (row: SearchApiRow, index: number): SearchResult => {
  const userName = String(row.user_name ?? '').trim();
  const firstName = String(row.first_name ?? '').trim();
  const lastName = String(row.last_name ?? '').trim();
  const category = normalizeCategory(String(row.category ?? ''));
  const fallbackId = `${userName || 'user'}-${index}`;

  return {
    id: String(row.id ?? fallbackId),
    userName,
    firstName,
    lastName,
    category,
    institution: String(row.institution ?? '').trim(),
    description: String(row.description ?? '').trim(),
  };
};

const getDisplayName = (result: SearchResult): string =>
  `${result.lastName} ${result.firstName}`.trim() || result.userName || '未設定ユーザー';

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text: string, query: string) => {
  const normalizedQuery = query.trim();
  if (!normalizedQuery || !text) return text;
  const chunks = text.split(new RegExp(`(${escapeRegExp(normalizedQuery)})`, 'gi'));
  return (
    <>
      {chunks.map((chunk, idx) =>
        chunk.toLowerCase() === normalizedQuery.toLowerCase() ? (
          <Box
            key={`${chunk}-${idx}`}
            component="mark"
            sx={{ backgroundColor: 'transparent', color: 'primary.main', fontWeight: 700 }}
          >
            {chunk}
          </Box>
        ) : (
          <React.Fragment key={`${chunk}-${idx}`}>{chunk}</React.Fragment>
        )
      )}
    </>
  );
};

const Search: React.FC = () => {
  const [username, setUsername] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [rowCount, setRowCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);

  const hasSearched = submittedQuery.length > 0;
  const resultCount = rowCount ?? results.length;

  const sortedResults = useMemo(
    () =>
      [...results].sort((a, b) => {
        const aName = `${a.lastName}${a.firstName}${a.userName}`;
        const bName = `${b.lastName}${b.firstName}${b.userName}`;
        return aName.localeCompare(bName, 'ja');
      }),
    [results]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = username.trim();

    if (!trimmed) {
      setError('usernameがありません');
      setResults([]);
      setRowCount(0);
      setSubmittedQuery('');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<SearchApiResponse>('/users/search', {
        params: { username: trimmed },
        // bulletin_token Cookie を送るために明示
        withCredentials: true,
      });

      const payload = response.data ?? {};
      const rows = Array.isArray(payload.rows) ? payload.rows : [];
      const mapped = rows.map(toSearchResult);
      const parsedCount = Number(payload.rowCount);

      setResults(mapped);
      setRowCount(Number.isFinite(parsedCount) ? parsedCount : mapped.length);
      setSubmittedQuery(trimmed);
    } catch (requestError: any) {
      const responseData = requestError?.response?.data;
      const backendMessage =
        typeof responseData === 'string'
          ? responseData
          : typeof responseData?.message === 'string'
            ? responseData.message
            : typeof responseData?.detail === 'string'
              ? responseData.detail
              : '';

      setError(backendMessage || '検索中にエラーが発生しました。');
      setResults([]);
      setRowCount(0);
      setSubmittedQuery(trimmed);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (result: SearchResult) => {
    setSelectedUser(result);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          background: (theme) =>
            `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}12 100%)`,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          ユーザー検索
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          `username` を部分一致で検索します。ログイン状態の Cookie を利用するため、`credentials:
          "include"` で送信されます。
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2.5 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              fullWidth
              required
              label="ユーザー名"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="例: johndoe"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
              disabled={loading}
              sx={{ minWidth: { xs: '100%', sm: 140 }, fontWeight: 700 }}
            >
              検索
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {hasSearched && !loading && !error && (
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              「{submittedQuery}」の検索結果: {resultCount} 件
            </Typography>
          </Stack>
        )}

        {loading && (
          <Paper
            variant="outlined"
            sx={{ p: 4, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <CircularProgress size={28} sx={{ mx: 'auto' }} />
            <Typography variant="body2" color="text.secondary">
              ユーザーを検索しています...
            </Typography>
          </Paper>
        )}

        {!loading && hasSearched && sortedResults.length === 0 && !error && (
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              一致するユーザーが見つかりませんでした
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              キーワードを変えて再検索してください。
            </Typography>
          </Paper>
        )}

        {!loading && sortedResults.length > 0 && (
          <Grid container spacing={2}>
            {sortedResults.map((result) => (
              <Grid item xs={12} sm={6} key={result.id}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 8px 20px ${theme.palette.primary.light}40`,
                    },
                  }}
                  onClick={() => handleOpenModal(result)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleOpenModal(result);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${getDisplayName(result)} の詳細を表示`}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, height: '100%' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                          flexShrink: 0,
                        }}
                      >
                        {getCategoryIcon(result.category)}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                          {getDisplayName(result)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {highlightText(result.userName, submittedQuery)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                      <Chip
                        size="small"
                        variant="outlined"
                        icon={getCategoryIcon(result.category)}
                        label={result.category}
                      />
                      <Chip
                        size="small"
                        variant="outlined"
                        label={result.institution || '所属機関未設定'}
                        sx={{ maxWidth: '100%' }}
                      />
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {result.description || '自己紹介は登録されていません。'}
                    </Typography>

                    <Box
                      sx={{
                        mt: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        color: 'primary.main',
                        fontWeight: 700,
                      }}
                    >
                      <Typography variant="body2">詳細を見る</Typography>
                      <ChevronRightIcon fontSize="small" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <SearchDetailModal open={openModal} content={selectedUser} onClose={handleCloseModal} />
    </Container>
  );
};

export default Search;
