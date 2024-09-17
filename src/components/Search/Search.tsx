import React, { useState, useEffect} from 'react';
import { Container, TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Card, CardContent  } from '@mui/material';
import { SearchResult } from './SearchTypes';
import SearchDetailModal from './SearchDetailModal';

const SearchForm: React.FC = () => {
const [searchData, setSearchData] = useState({
    name: '',
    institution: '',
    institutionType: '',
});

const [results, setResults] = React.useState<SearchResult[]>([]);
const [openModal, setOpenModal] = React.useState(false);
const [modalContent, setModalContent] = React.useState<SearchResult | null>(null);

/* // useEffectを用いた条件付きモーダル開閉制御
useEffect(() => {
    if (modalContent) { // modalContentがnullでない時にモーダルを開く
        setOpenModal(true);
    } else {
        setOpenModal(false);
    }
}, [modalContent]); // modalContentが変更されたときに実行 */

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
    /* institutionType: event.target.value, */
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

return (
    <Container component="main" maxWidth="sm">
    <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        }}
    >
        <TextField
        label="名前"
        name="name"
        value={searchData.name}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
        />
        <TextField
        label="所属機関"
        name="institution"
        value={searchData.institution}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
        />
        <FormControl fullWidth margin="normal">
        <InputLabel>所属機関の種類</InputLabel>
        <Select
            value={searchData.institutionType}
            onChange={handleSelectChange}
            label="所属機関の種類"
        >
            <MenuItem value="">すべて</MenuItem>
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
        sx={{ mt: 2 }}
        >
        検索
        </Button>
    </Box>

    {/* <Box sx={{ mt: 4 }}>
        {results.length > 0 ? (
        results.map(result => (
            <Card 
                key={result.id}
                sx={{ mb: 2 }}
                onMouseEnter={(event) => {
                    event.stopPropagation();
                    handleOpenModal(result);
                }}
                onMouseLeave={(event) => {
                    event.stopPropagation();
                    handleCloseModal();
                }}
            >
            <CardContent>
                <Typography variant="h6">
                {result.lastName} {result.firstName}
                </Typography>
                <Typography color="text.secondary">
                {result.institution}
                </Typography>
                <Typography variant="body2">
                種類: {result.institutionType}
                </Typography>
            </CardContent>
            </Card>
        ))
        ) : (
        <Typography variant="body2">
            検索結果がここに表示されます。
        </Typography>
        )}
    </Box> */}
    <Box sx={{ mt: 4 }}>
        {results.map(result => (
          <Card key={result.id} sx={{ mb: 2 }} onClick={() => handleOpenModal(result)} >
            <CardContent>
              <Typography variant="h6">{result.lastName} {result.firstName}</Typography>
              <Typography color="text.secondary">{result.institution}</Typography>
              <Typography variant="body2">種類: {result.institutionType}</Typography>
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

