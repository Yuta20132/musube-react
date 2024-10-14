import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    Paper, 
    Typography, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    Grid, 
    InputAdornment, 
    IconButton 
} from '@mui/material';
import { 
    Title as TitleIcon, 
    Description as DescriptionIcon, 
    Group as GroupIcon 
} from '@mui/icons-material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface ThreadsCreateForm {
  onSubmit: (thread: { title: string, description: string, memberType: number }) => void;
}

const ThreadsCreate: React.FC<ThreadsCreateForm> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memberType, setMemberType] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      setLoading(true);
      try {
        const response = await axios.post('/api/threads', { title, description, memberType });
        onSubmit(response.data);
        setTitle('');
        setDescription('');
        setMemberType(1);
      } catch (error) {
        console.error('スレッド作成時のエラー:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMemberTypeChange = (event: SelectChangeEvent<number>) => {
    setMemberType(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        mb: 4,
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          maxWidth: 600, 
          width: '100%', 
          background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)', 
          borderRadius: 3 
        }}
      >
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}
        >
          スレッドの作成
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
            }}
          />
          <TextField
            label="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 2,
            }}
          />
          <FormControl variant="outlined" fullWidth sx={{ backgroundColor: '#ffffff', borderRadius: 2 }}>
            <InputLabel>メンバータイプ</InputLabel>
            <Select
              value={memberType}
              onChange={handleMemberTypeChange}
              label="メンバータイプ"
              startAdornment={
                <InputAdornment position="start">
                  <GroupIcon color="action" />
                </InputAdornment>
              }
            >
              <MenuItem value={1}>一般</MenuItem>
              <MenuItem value={2}>管理者</MenuItem>
              <MenuItem value={3}>モデレーター</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              startIcon={loading ? null : <></>}
              sx={{ 
                paddingX: 4,
                paddingY: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'linear-gradient(45deg, #21cbf3 30%, #2196f3 90%)',
                },
              }}
            >
              {loading ? '作成中...' : '作成'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ThreadsCreate;
