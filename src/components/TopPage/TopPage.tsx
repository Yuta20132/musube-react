import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';


const TopPage = () => {
    const navigate = useNavigate(); 

    const handleRegister = () => {
        navigate('/register_form');
    };

    const handleLogin = () => {
        navigate('/login');
    }
  return (
    <Container maxWidth="sm">
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h4" gutterBottom>
                Welcome to Our Application
            </Typography>

            <Button
                variant='contained'
                color="primary"
                onClick={handleRegister}
                sx={{ marginTop: 2, width: '100%' }}
            >
                登録
            </Button>

            <Button
                variant='outlined'
                color="secondary"
                onClick={handleLogin}
                sx={{ marginTop: 2, width: '100%' }}
            >
                ログイン
            </Button>

        </Box>
    </Container>
  )
}

export default TopPage
