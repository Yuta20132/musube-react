import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
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
          backgroundColor: 'transparent', // 背後の色を完全に透明に設定
          opacity: 0 // 背景の透明度を0にして完全な透明を実現
        }
      }}

    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          maxWidth: '90%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          textAlign: 'center', // テキストを中央揃えに設定
         
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {content && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {content.lastName} {content.firstName}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              {content.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>所属:</strong> {content.institution}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>種類:</strong> {content.institutionType}
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;
