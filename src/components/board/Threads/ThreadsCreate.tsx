import React, { useEffect, useMemo, useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import { useNotification } from '../../../contexts/NotificationContext';
import { BOARD_LABELS, CategoryId } from '../../../utils/categoryAccess';

interface ThreadsCreateForm {
  onThreadSuccess?: () => void;
  onCancel?: () => void;
  accessibleCategoryIds: CategoryId[];
  initialCategoryId: CategoryId;
}

const apiUrl = process.env.REACT_APP_API_URL;

const ThreadsCreate: React.FC<ThreadsCreateForm> = ({
  onThreadSuccess,
  onCancel,
  accessibleCategoryIds,
  initialCategoryId,
}) => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const availableCategoryIds = useMemo<CategoryId[]>(
    () => (accessibleCategoryIds.length > 0 ? accessibleCategoryIds : [1 as CategoryId]),
    [accessibleCategoryIds]
  );
  const [memberType, setMemberType] = useState<string>(String(initialCategoryId));

  const createThreadMutation = useMutation({
    mutationFn: async (payload: {
      title: string;
      description: string;
      category_id: number;
    }) => {
      await axios.post(
        `${apiUrl}/threads/`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
    },
    onSuccess: async () => {
      showNotification('スレッドを作成しました', 'success');
      setTitle('');
      setDescription('');
      await queryClient.invalidateQueries({ queryKey: ['threads'] });
      onThreadSuccess?.();
    },
    onError: (error) => {
      console.error('スレッド作成時のエラー:', error);
      showNotification('スレッドを作成できませんでした。もう一度お試しください。', 'error');
    },
  });

  useEffect(() => {
    const defaultCategory = availableCategoryIds.includes(initialCategoryId)
      ? initialCategoryId
      : availableCategoryIds[0];
    setMemberType(String(defaultCategory));
  }, [availableCategoryIds, initialCategoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() && description.trim()) {
      createThreadMutation.mutate({
        title: title.trim(),
        description: description.trim(),
        category_id: Number(memberType),
      });
    }
  };

  const handleMemberTypeChange = (event: SelectChangeEvent<string>) => {
    setMemberType(String(event.target.value));
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 800,
        mx: 'auto',
        mb: 0
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}
      >
        新しいスレッドを作成
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="タイトル"
            autoFocus
            helperText="話したいことが伝わるタイトルを付けましょう"
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
            label="スレッドの説明"
            helperText="質問の背景や、共有したい内容を書いてください"
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
            <InputLabel>掲示板カテゴリ</InputLabel>
            <Select
              value={memberType}
              onChange={handleMemberTypeChange}
              label="掲示板カテゴリ"
              disabled={availableCategoryIds.length === 1}
              startAdornment={
                <InputAdornment position="start">
                  <GroupIcon color="primary" />
                </InputAdornment>
              }
            >
              {availableCategoryIds.map((categoryId) => (
                <MenuItem key={categoryId} value={String(categoryId)}>
                  {BOARD_LABELS[categoryId]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {onCancel && <Button onClick={onCancel} disabled={createThreadMutation.isPending}>キャンセル</Button>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createThreadMutation.isPending || !title.trim() || !description.trim()}
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              {createThreadMutation.isPending ? '作成中…' : 'スレッドを作成'}
            </Button>
          </Box>
        </Box>
    </Paper>
  );
};

export default ThreadsCreate;
