import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const SendEmail = () => {
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
        <Button variant="contained" color="primary">
        メールがこない場合はこちら
        </Button>
    </Box>
    </Container>
);
};

export default SendEmail;
