import React, { useState } from 'react'
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
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
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#e3f2fd', borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#0d47a1' }}>
        スレッド検索
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="検索キーワード"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
          sx={{ backgroundColor: '#ffffff', borderRadius: 1, mr: 1 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ 
            backgroundColor: '#0d47a1', 
            '&:hover': { backgroundColor: '#0b3c91' },
            height: '50%',
            width: 'auto',
          }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Paper>
  )
}

export default ThreadsSearch
