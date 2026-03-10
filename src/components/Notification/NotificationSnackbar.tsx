import React from 'react';
import { Snackbar, Alert, Slide, SlideProps } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNotification } from '../../contexts/NotificationContext';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const NotificationSnackbar: React.FC = () => {
  const { notification, hideNotification } = useNotification();
  const theme = useTheme();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    hideNotification();
  };

  const severityColor = {
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  }[notification.severity];

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={TransitionUp}
      sx={{
        mt: { xs: 9, sm: 10 },
        mr: { xs: 1, sm: 2 },
        zIndex: (currentTheme) => currentTheme.zIndex.modal + 1,
      }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="standard"
        sx={{
          alignItems: 'center',
          minWidth: { xs: 'calc(100vw - 24px)', sm: 360 },
          maxWidth: 480,
          px: 1.5,
          py: 0.5,
          fontWeight: 600,
          color: 'text.primary',
          backgroundColor: alpha(theme.palette.background.paper, 0.96),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(severityColor, 0.45)}`,
          borderLeft: `6px solid ${severityColor}`,
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.26)',
          '& .MuiAlert-icon': {
            color: severityColor,
          },
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
