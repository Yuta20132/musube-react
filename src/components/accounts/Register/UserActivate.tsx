import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

const apiUrl = process.env.REACT_APP_API_URL;

const UserActivate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activationStatus, setActivationStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const activateUser = async () => {
      try {
        await axios.post(`${apiUrl}/users/verify/`, { token });
        setActivationStatus('success');
      } catch (error) {
        console.error(error);
        setActivationStatus('error');
      }
    };

    activateUser();
  }, [location.search]);

  const handleLoginForm = () => navigate('/login');

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            アカウントのアクティベート
          </Typography>

          {activationStatus === 'pending' && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                アカウントをアクティベート中です...
              </Typography>
            </Box>
          )}

          {activationStatus === 'success' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                アカウントが正常にアクティベートされました。
              </Alert>
              <Button variant="contained" size="large" onClick={handleLoginForm} fullWidth>
                ログインページへ
              </Button>
            </Box>
          )}

          {activationStatus === 'error' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                アカウントのアクティベーションに失敗しました。再度お試しください。
              </Alert>
              <Button variant="outlined" size="large" onClick={() => window.location.reload()} fullWidth>
                リトライ
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserActivate;
