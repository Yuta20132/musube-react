import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Card, CardContent  } from '@mui/material';

interface SearchResult {
id: number;
name: string;
institution: string;
institutionType: string;
}

const SearchForm: React.FC = () => {
const [searchData, setSearchData] = useState({
    name: '',
    institution: '',
    institutionType: '',
});

const [results, setResults] = useState<SearchResult[]>([]);

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
    institutionType: event.target.value,
    });
};


const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 仮の検索結果データを設定
    const mockResults: SearchResult[] = [
    { id: 1, name: '山田 太郎', institution: 'A大学', institutionType: '大学・研究所' },
    { id: 2, name: '佐藤 花子', institution: 'B研究所', institutionType: '大学・研究所' },
    { id: 3, name: '鈴木 一郎', institution: 'C企業', institutionType: '企業' },
    { id: 4, name: '高橋 健二', institution: 'D病院', institutionType: '医者' },
    { id: 5, name: '中村 真一', institution: 'E会社', institutionType: '一般' },
    ];

    // 検索フィルタ
    const filteredResults = mockResults.filter(result => 
    (searchData.name === '' || result.name.includes(searchData.name)) &&
    (searchData.institution === '' || result.institution.includes(searchData.institution)) &&
    (searchData.institutionType === '' || result.institutionType === searchData.institutionType)
    );

    setResults(filteredResults); // フィルタされた結果をセット
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

    <Box sx={{ mt: 4 }}>
        {results.length > 0 ? (
        results.map(result => (
            <Card key={result.id} sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">
                {result.name}
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
    </Box>

    </Container>
);
};

export default SearchForm;
