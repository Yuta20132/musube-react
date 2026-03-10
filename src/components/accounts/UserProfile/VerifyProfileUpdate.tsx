import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Alert,
  Typography,
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

type VerifyStatus = 'pending' | 'success' | 'error' | 'invalid';

const VerifyProfileUpdate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [status, setStatus] = useState<VerifyStatus>('pending');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setStatus('invalid');
      return;
    }

    const verifyProfileUpdate = async () => {
      try {
        await axios.post(`${apiUrl}/users/verify-profile`, { token });
        setStatus('success');
      } catch (error) {
        console.error('verifyProfileUpdate error:', error);
        setStatus('error');
      }
    };

    verifyProfileUpdate();
  }, [location.search]);

  const handleMainAction = () => {
    navigate(isLoggedIn ? '/profile' : '/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            プロフィール変更の認証
          </Typography>

          {status === 'pending' && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                認証を処理しています...
              </Typography>
            </Box>
          )}

          {status === 'success' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                プロフィール変更を確認しました。
              </Alert>
              <Button variant="contained" size="large" onClick={handleMainAction} fullWidth>
                {isLoggedIn ? 'プロフィールへ戻る' : 'ログインページへ'}
              </Button>
            </Box>
          )}

          {status === 'invalid' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                認証リンクが不正です。URLに token が含まれているか確認してください。
              </Alert>
              <Button variant="outlined" size="large" onClick={handleMainAction} fullWidth>
                {isLoggedIn ? 'プロフィールへ戻る' : 'ログインページへ'}
              </Button>
            </Box>
          )}

          {status === 'error' && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                認証に失敗しました。リンクの有効期限切れ、または既に認証済みの可能性があります。
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

export default VerifyProfileUpdate;
