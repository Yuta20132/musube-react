import React from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { useNotification } from '../../contexts/NotificationContext';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const NotificationSnackbar: React.FC = () => {
  const { notification, hideNotification } = useNotification();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    hideNotification();
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={TransitionUp}
      sx={{ mt: 8 }} // ヘッダーの下に表示されるように調整
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="filled"
        sx={{
          width: '100%',
          fontWeight: 500,
          boxShadow: 3,
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
