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
          backgroundColor: 'rgba(173, 216, 230, 0.5)', // 薄いブルーの背景を設定
          opacity: 1, // 背景の透明度を設定
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
          borderRadius: 4, // 角を少し丸める
          boxShadow: 24,
          p: 6,
          outline: 'none',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)', // 薄いブルーのグラデーション背景
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: '#007bb2', // クローズボタンの色をブルーに設定
          }}
        >
          <CloseIcon />
        </IconButton>
        {content && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: '#007bb2', fontFamily: 'Arial, sans-serif', fontSize: '3rem' }}>
              {content.lastName} {content.firstName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 2, fontFamily: 'Arial, sans-serif', fontSize: '1.8rem' }}>
              {content.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, fontFamily: 'Arial, sans-serif', fontSize: '1.5rem' }}>
              <strong>所属:</strong> {content.institution}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontFamily: 'Arial, sans-serif', fontSize: '1.5rem' }}>
              <strong>種類:</strong> {content.institutionType}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 6, fontSize: '1.2rem' }} onClick={() => alert('詳細ボタンがクリックされました')}>詳細</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;