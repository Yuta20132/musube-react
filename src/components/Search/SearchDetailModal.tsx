import React from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { SearchResult } from './SearchTypes';

interface SearchDetailModalProps {
  open: boolean;
  content: SearchResult | null;
  onClose: () => void;
}

const SearchDetailModal: React.FC<SearchDetailModalProps> = ({ open, content, onClose }) => {
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
          width: '600px', // 横幅を狭く設定
          maxWidth: '90%',
          height: '80vh', // 縦長に設定
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 2,
          p: 6,
          outline: 'none',
          textAlign: 'center',
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
        {content && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {content.lastName} {content.firstName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 2 }}>
              {content.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3 }}>
              <strong>所属:</strong> {content.institution}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>種類:</strong> {content.institutionType}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 6 }} onClick={() => alert('詳細ボタンがクリックされました')}>詳細</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;
