import React from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SearchResult } from './SearchTypes';

interface SearchDetailModalProps {
  open: boolean;
  content: SearchResult | null;
  onClose: () => void;
}

const SearchDetailModal: React.FC<SearchDetailModalProps> = ({ open, content, onClose }) => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('大学') || category.includes('研究')) {
      return <SchoolIcon color="primary" />;
    }
    if (category.includes('企業')) {
      return <BusinessIcon color="primary" />;
    }
    if (category.includes('医')) {
      return <LocalHospitalIcon color="primary" />;
    }
    if (category.includes('管理')) {
      return <AdminPanelSettingsIcon color="primary" />;
    }
    return <PersonIcon color="primary" />;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(100, 116, 139, 0.5)', // テーマのgrey.500を使用
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '92%', sm: 600 },
          maxWidth: '92%',
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 2,
          p: 4,
          outline: 'none',
          overflowY: 'auto',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
        {!content ? null : (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  flexShrink: 0,
                }}
              >
                {getCategoryIcon(content.category)}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {content.lastName || content.firstName
                    ? `${content.lastName} ${content.firstName}`.trim()
                    : content.userName}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: 'text.secondary' }}>
                  <Typography variant="body2">{content.userName}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={content.category}
                    icon={getCategoryIcon(content.category)}
                  />
                </Stack>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  所属機関
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                  {getCategoryIcon(content.category)}
                  <Typography variant="body1">
                    {content.institution || '未設定'}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  自己紹介
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.7,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 1.5,
                  }}
                >
                  {content.description || '自己紹介は登録されていません。'}
                </Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button variant="outlined" onClick={onClose}>閉じる</Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;
