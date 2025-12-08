import React, { useMemo, useState } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    Box, 
    Typography, 
    MenuItem, 
    Select, 
    FormControl, 
    InputLabel, 
    SelectChangeEvent, 
    Card, 
    CardContent, 
    InputAdornment, 
    Paper,
    Avatar,
    Chip,
    Stack,
    Divider,
    CircularProgress,
    IconButton
} from '@mui/material';
import { Search as SearchIcon, School as SchoolIcon, Business as BusinessIcon, LocalHospital as LocalHospitalIcon, Person as PersonIcon, Email as EmailIcon, ChevronRight as ChevronRightIcon, SearchOff as SearchOffIcon } from '@mui/icons-material';
import { SearchResult } from './SearchTypes';
import SearchDetailModal from './SearchDetailModal';
import apiClient from '../../utils/apiClient';

const SearchForm: React.FC = () => {
    const [searchData, setSearchData] = useState({
        name: '',
        institution: '',
        institutionType: '',
    });

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<'name' | 'institution' | 'type'>('name');
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState<SearchResult | null>(null);

    // category_id -> 表示ラベル
    const categoryIdToLabel = (id?: string | number | null): string => {
        const n = Number(id);
        switch (n) {
            case 2: return '大学・研究所';
            case 3: return '企業';
            case 4: return '医者';
            case 1:
            default: return '一般';
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchData({
            ...searchData,
            [name]: value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSearchData({
            ...searchData,
            institutionType: event.target.value as string,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // username のみを送信（他のフォームはダミー）
            const res = await apiClient.get('/users/search', {
                params: { username: searchData.name?.trim() || '' },
                // Cookie(bulletin_token)送信用
                withCredentials: true,
            });
            const data = res.data || {};
            const users = Array.isArray(data.users)
                ? data.users
                : Array.isArray(data.rows)
                    ? data.rows
                    : [];

            const mapped: SearchResult[] = users.map((u: any) => ({
                id: String(u.id ?? ''),
                firstName: String(u.first_name ?? ''),
                lastName: String(u.last_name ?? ''),
                userName: String(u.user_name ?? ''),
                email: String(u.email ?? ''),
                institution: String(u.institution ?? ''),
                institutionType: categoryIdToLabel(u.category_id),
            }));
            setResults(mapped);
        } catch (e: any) {
            // 認証やネットワークエラー時
            const status = e?.response?.status;
            if (status === 401) {
                setError('認証が必要です。ログイン状態を確認してください。');
            } else {
                setError('検索中にエラーが発生しました。時間をおいて再試行してください。');
            }
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (result: SearchResult) => {
        setModalContent(result);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // アイコンを種類に応じて変更
    const getInstitutionIcon = (type: string) => {
        switch(type) {
            case '大学・研究所':
                return <SchoolIcon color="primary" />;
            case '企業':
                return <BusinessIcon color="primary" />;
            case '医者':
                return <LocalHospitalIcon color="primary" />;
            case '一般':
            default:
                return <PersonIcon color="primary" />;
        }
    };

    const handleClearFilter = (key: keyof typeof searchData) => {
        // API連携では username 以外はダミー。結果は変更しない。
        setSearchData(prev => ({ ...prev, [key]: '' }));
    };

    const handleClearAll = () => {
        setSearchData({ name: '', institution: '', institutionType: '' });
    };

    const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const highlight = (text: string, query: string) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
        return (
            <>
                {parts.map((part, i) => (
                    part.toLowerCase() === query.toLowerCase() ?
                        <Box key={i} component="mark" sx={{ backgroundColor: 'transparent', color: 'primary.main', fontWeight: 700 }}>{part}</Box> :
                        <React.Fragment key={i}>{part}</React.Fragment>
                ))}
            </>
        );
    };

    const getInitials = (lastName: string, firstName: string) => {
        const l = lastName?.[0] ?? '';
        const f = firstName?.[0] ?? '';
        return `${l}${f}`;
    };

    const sortedResults = useMemo(() => {
        const list = [...results];
        switch (sortKey) {
            case 'institution':
                list.sort((a, b) => a.institution.localeCompare(b.institution, 'ja'));
                break;
            case 'type':
                list.sort((a, b) => a.institutionType.localeCompare(b.institutionType, 'ja'));
                break;
            case 'name':
            default:
                list.sort((a, b) => (`${a.lastName}${a.firstName}`).localeCompare(`${b.lastName}${b.firstName}`, 'ja'));
        }
        return list;
    }, [results, sortKey]);

    return (
        <Container component="main" maxWidth="sm">
            <Paper 
                elevation={1}
                sx={{ 
                    p: 4, 
                    mt: 4
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}
                >
                    ユーザー検索
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="名前"
                        name="name"
                        value={searchData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="所属機関"
                        name="institution"
                        value={searchData.institution}
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SchoolIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>所属機関の種類</InputLabel>
                        <Select
                            value={searchData.institutionType}
                            onChange={handleSelectChange}
                            label="所属機関の種類"
                            startAdornment={
                                <InputAdornment position="start">
                                    {getInstitutionIcon(searchData.institutionType)}
                                </InputAdornment>
                            }
                        >
                            <MenuItem value="">
                                <em>すべて</em>
                            </MenuItem>
                            <MenuItem value="一般">一般</MenuItem>
                            <MenuItem value="大学・研究所">大学・研究所</MenuItem>
                            <MenuItem value="企業">企業</MenuItem>
                            <MenuItem value="医者">医者</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SearchIcon />}
                        sx={{ mt: 2 }}
                    >
                        検索
                    </Button>
                </Box>
            </Paper>

            {/* 結果表示領域 */}
            <Box sx={{ mt: 4 }}>
                {/* エラー表示 */}
                {error && (
                    <Paper variant="outlined" sx={{ p: 2, mb: 2, borderColor: 'error.light' }}>
                        <Typography color="error" variant="body2">{error}</Typography>
                    </Paper>
                )}
                {/* アクティブなフィルタ */}
                {(searchData.name || searchData.institution || searchData.institutionType) && (
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                        {searchData.name && (
                            <Chip label={`名前: ${searchData.name}`} onDelete={() => handleClearFilter('name')} />
                        )}
                        {searchData.institution && (
                            <Chip label={`所属: ${searchData.institution}`} onDelete={() => handleClearFilter('institution')} />
                        )}
                        {searchData.institutionType && (
                            <Chip label={`種類: ${searchData.institutionType}`} onDelete={() => handleClearFilter('institutionType')} />
                        )}
                        <Box sx={{ flexGrow: 1 }} />
                        <Button size="small" variant="text" onClick={handleClearAll}>条件をクリア</Button>
                    </Stack>
                )}
                {/* ヘッダー（件数 / 並び替え） */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        検索結果: {results.length}件
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>並び替え</InputLabel>
                        <Select
                            label="並び替え"
                            value={sortKey}
                            onChange={(e: SelectChangeEvent<'name' | 'institution' | 'type'>) => setSortKey(e.target.value as any)}
                        >
                            <MenuItem value="name">氏名</MenuItem>
                            <MenuItem value="institution">所属</MenuItem>
                            <MenuItem value="type">種類</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                {/* ローディング */}
                {loading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
                        <CircularProgress size={28} />
                        <Typography sx={{ ml: 2 }} color="text.secondary">検索中…</Typography>
                    </Box>
                )}

                {/* 空状態 */}
                {!loading && results.length === 0 && (
                    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                        <SearchOffIcon color="disabled" sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>該当する結果がありません</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            条件を緩めるか、キーワードを見直してください。
                        </Typography>
                    </Paper>
                )}

                {/* リスト */}
                {!loading && sortedResults.map(result => (
                    <Card
                        key={result.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`${result.lastName} ${result.firstName} の詳細を開く`}
                        sx={{ mb: 2, cursor: 'pointer' }}
                        onClick={() => handleOpenModal(result)}
                        onKeyDown={(e: React.KeyboardEvent) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleOpenModal(result);
                            }
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                                        {getInitials(result.lastName, result.firstName)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            {highlight(`${result.lastName} ${result.firstName}`, searchData.name)}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                                            <EmailIcon sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{result.email}</Typography>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                                            {getInstitutionIcon(result.institutionType)}
                                            <Typography variant="body2">
                                                {highlight(result.institution, searchData.institution)}
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Chip
                                        variant="outlined"
                                        size="small"
                                        label={result.institutionType}
                                        icon={getInstitutionIcon(result.institutionType)}
                                        sx={{ fontWeight: 500 }}
                                    />
                                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                                    <IconButton aria-label="詳細" size="small">
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <SearchDetailModal
                open={openModal}
                content={modalContent}
                onClose={handleCloseModal}
            />
        </Container>
    );
};

export default SearchForm;
