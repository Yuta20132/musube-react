import React, { useState } from 'react'
import { TextField, Button, Box, Paper, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ThreadsSearchProps {
  onSearch: (searchTerm: string) => void;
}

const ThreadsSearch: React.FC<ThreadsSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <Paper elevation={1} sx={{ padding: 3, marginTop: 2, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, mb: 2 }}>
        スレッド検索
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          label="検索キーワード"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
          sx={{ px: 3 }}
        >
          検索
        </Button>
      </Box>
    </Paper>
  )
}

export default ThreadsSearch
