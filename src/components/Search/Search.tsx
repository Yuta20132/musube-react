import React, { useState } from 'react';
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
    IconButton 
} from '@mui/material';
import { Search as SearchIcon, School as SchoolIcon, Business as BusinessIcon, LocalHospital as LocalHospitalIcon, Person as PersonIcon } from '@mui/icons-material';
import { SearchResult } from './SearchTypes';
import SearchDetailModal from './SearchDetailModal';

const SearchForm: React.FC = () => {
    const [searchData, setSearchData] = useState({
        name: '',
        institution: '',
        institutionType: '',
    });

    const [results, setResults] = useState<SearchResult[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState<SearchResult | null>(null);

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 仮の検索結果データを設定
        const mockResults: SearchResult[] = [
            { id: 1, firstName: '太郎', lastName: '山田', userName: 'taro_y', email: 'taro@example.com', institution: 'A大学', institutionType: '大学・研究所' },
            { id: 2, firstName: '花子', lastName: '佐藤', userName: '佐藤花子', email: 'hanako@example.com', institution: 'B研究所', institutionType: '大学・研究所' },
            { id: 3, firstName: '一郎', lastName: '鈴木', userName: 'suzuki', email: 'suzuki@example.com', institution: 'C企業', institutionType: '企業' },
            { id: 4, firstName: '健二', lastName: '高橋', userName: 'hassi-', email: 'takahashi@example.com', institution: 'D病院', institutionType: '医者' },
            { id: 5, firstName: '真一', lastName: '中村', userName: '中村真一', email: 'takahashi@example.com', institution: 'E会社', institutionType: '一般' },
        ];
        setResults(mockResults);

        // 検索フィルタ
        const filteredResults = mockResults.filter(result => 
            (searchData.name === '' || result.firstName.includes(searchData.name) || result.lastName.includes(searchData.name) || result.userName.includes(searchData.name)) &&
            (searchData.institution === '' || result.institution.includes(searchData.institution)) &&
            (searchData.institutionType === '' || result.institutionType === searchData.institutionType)
        );

        setResults(filteredResults); // フィルタされた結果をセット
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
                return <SchoolIcon />;
            case '企業':
                return <BusinessIcon />;
            case '医者':
                return <LocalHospitalIcon />;
            case '一般':
            default:
                return <PersonIcon />;
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Card 
                sx={{ 
                    p: 4, 
                    mt: 4, 
                    boxShadow: 3, 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)' 
                }}
            >
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
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
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: '#ffffff',
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
                                    <SchoolIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: '#ffffff',
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
                            sx={{
                                borderRadius: 2,
                                backgroundColor: '#ffffff',
                            }}
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
                        sx={{ 
                            mt: 2, 
                            borderRadius: 2, 
                            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #21cbf3 30%, #2196f3 90%)',
                            }
                        }}
                    >
                        検索
                    </Button>
                </Box>
            </Card>

            <Box sx={{ mt: 4 }}>
                {results.map(result => (
                    <Card 
                        key={result.id} 
                        sx={{ 
                            mb: 2, 
                            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', // 薄いブルーのグラデーション
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: 6,
                            },
                            borderRadius: 2,
                        }} 
                        onClick={() => handleOpenModal(result)} 
                    >
                        <CardContent>
                            <Typography 
                                variant="h6" 
                                sx={{ fontWeight: 'bold' }}
                            >
                                {result.lastName} {result.firstName}
                            </Typography>
                            <Typography 
                                color="text.secondary" 
                                sx={{ fontWeight: 'bold' }}
                            >
                                {result.institution}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ fontWeight: 'bold' }}
                            >
                                種類: {result.institutionType}
                            </Typography>
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
