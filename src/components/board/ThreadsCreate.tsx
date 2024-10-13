import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
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

    //APIにリクエストを送信する関数
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
        console.error('Error creating thread:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setMemberType(event.target.value as number);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 4, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold'}}>
        スレッドの作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          variant="outlined"
          required
          sx={{ width: '100%', maxWidth: 500 }}
        />
        <TextField
          label="説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
          sx={{ width: '100%', maxWidth: 500 }}
        />
      
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? '作成中...' : '作成'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ThreadsCreate;
