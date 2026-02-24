import React, { useState } from 'react'
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

interface PostSearchProps {
  onSearch: (searchTerm: string) => void;
}

const PostSearch: React.FC<PostSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        padding: 2,
        marginTop: 2,
        maxWidth: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        borderRadius: 3
      })}
    >
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark' }}>
        投稿検索
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
  <TextField
    label="検索キーワード"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    variant="outlined"
    fullWidth
    size="medium"
    sx={{ backgroundColor: 'common.white', borderRadius: 1, mr: 1 }}
  />
  <Button
    type="submit"
    variant="contained"
    sx={{
      backgroundColor: 'primary.main',
      '&:hover': { backgroundColor: 'primary.dark' },
      minWidth: '56px',
      height: '56px',
      padding: 0,
      borderRadius: 2,
      boxShadow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <SearchIcon />
  </Button>
</Box>

    </Paper>
  )
}

export default PostSearch
