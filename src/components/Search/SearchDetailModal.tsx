import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { SearchResult } from './SearchTypes'; // 適切なパスに調整してください

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
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4 }}>
        {content && (
          <>
            <Typography variant="h6">{content.lastName} {content.firstName}</Typography>
            <Typography variant="body1">{content.email}</Typography>
            <Typography variant="body2">所属: {content.institution}</Typography>
            <Typography variant="body2">種類: {content.institutionType}</Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SearchDetailModal;
