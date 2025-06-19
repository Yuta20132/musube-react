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
    InputAdornment, 
} from '@mui/material';
import { 
    Title as TitleIcon, 
    Description as DescriptionIcon, 
    Group as GroupIcon, 
} from '@mui/icons-material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface ThreadsCreateForm {
  onThreadSuccess?: () => void;
}

const apiUrl = process.env.REACT_APP_API_URL;

const ThreadsCreate: React.FC<ThreadsCreateForm> = ({onThreadSuccess }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memberType, setMemberType] = useState<string>('1');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() && description.trim()) {
      const token = localStorage.getItem("access_token");
      setLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/threads/`, 
        { 
          title: title, 
          description: description, 
          category_id:memberType
         },{
          headers: {
            'Authorization': `Bearer ${token}`,
          },withCredentials: true,
         }
         
         );
        if (onThreadSuccess) {
          onThreadSuccess();
        }
        setTitle('');
        setDescription('');
        setMemberType('1');
      } catch (error) {
        console.error('スレッド作成時のエラー:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMemberTypeChange = (event: SelectChangeEvent<String>) => {
    setMemberType(String(event.target.value));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          maxWidth: 600, 
          width: '100%'
        }}
      >
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom 
          sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}
        >
          スレッドの作成
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                  <TitleIcon color="primary" />
                </InputAdornment>
              ),
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
                  <DescriptionIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>メンバータイプ</InputLabel>
            <Select
              value={memberType}
              onChange={handleMemberTypeChange}
              label="メンバータイプ"
              startAdornment={
                <InputAdornment position="start">
                  <GroupIcon color="primary" />
                </InputAdornment>
              }
            >
              <MenuItem value={'1'}>一般</MenuItem>
              <MenuItem value={'2'}>管理者</MenuItem>
              <MenuItem value={'3'}>モデレーター</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              size="large"
              sx={{ px: 4, py: 1.5 }}
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
