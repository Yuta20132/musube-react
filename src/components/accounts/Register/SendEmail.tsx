import React, { useMemo, useState } from 'react';
import { Container, Typography, Button, Box, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const SendEmail = () => {
  const location = useLocation();
  const email = useMemo(() => {
    const state = location.state as { email?: string } | null;
    return state?.email ?? '';
  }, [location.state]);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setMessage(null);
    if (!email) {
      setMessage({ type: 'error', text: 'メールアドレスを取得できませんでした。登録画面からやり直してください。' });
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${apiUrl}/users/register-resend`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setMessage({ type: 'success', text: '確認メールを再送しました。メールをご確認ください。' });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: error?.response?.data?.message || '再送に失敗しました。時間をおいて再度お試しください。' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          仮登録が完了しました。
        </Typography>
        <Typography variant="body1" gutterBottom>
          登録されたメールアドレスをご確認ください
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Button variant="contained" color="primary" onClick={handleResend} disabled={loading}>
          {loading ? '送信中...' : 'メールがこない場合はこちら'}
        </Button>
      </Box>
    </Container>
  );
};

export default SendEmail;
