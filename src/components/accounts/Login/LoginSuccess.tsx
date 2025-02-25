import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper, Button,CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';

const LoginSuccess: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // 3秒後に自動的にホームページにリダイレクト
        const timer = setTimeout(() => {
            navigate('/threads_page');
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [navigate]);
    
    const handleGoHome = () => {
        navigate('/threads_page');
    };
    
    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8
            }}
        >
     
                <Container maxWidth="sm">
                    <Paper
                        elevation={10}
                        sx={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            textAlign: 'center',
                            py: 8,
                            px: 4,
                            backdropFilter: 'blur(20px)',
                            bgcolor: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
                        
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                            ログイン成功！
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            認証が完了しました。メインページに移動します...
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <CircularProgress size={24} sx={{ color: '#4caf50' }} />
                        </Box>
                        
                        <Button
                            variant="contained"
                            size="large"
                            color="success"
                            startIcon={<HomeIcon />}
                            onClick={handleGoHome}
                            sx={{
                                borderRadius: '12px',
                                py: 1.5,
                                px: 4,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                '&:hover': {
                                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                }
                            }}
                        >
                            ホームに進む
                        </Button>
                    </Paper>
                </Container>
      
        </Box>
    );
};

export default LoginSuccess;
