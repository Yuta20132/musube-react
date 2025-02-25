import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Typography, 
    Container, 
    Paper, 
    Card, 
    CardContent,
    Grid,
    Zoom,
    Divider
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// カスタムChipコンポーネントのprops型定義
interface ChipProps {
    icon: React.ReactNode;
    label: string;
    sx?: React.CSSProperties | any;
}

// カスタムChipコンポーネント
const Chip: React.FC<ChipProps> = ({ icon, label, sx }) => (
    <Box 
        sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            py: 1, 
            px: 2, 
            borderRadius: 4,
            ...sx
        }}
    >
        {icon}
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{label}</Typography>
    </Box>
);

const TopPage = () => {
    const navigate = useNavigate(); 
    // Zoomアニメーションを制御するための状態
    const [animateChips, setAnimateChips] = useState(false);

    // コンポーネントがマウントされた後にアニメーションを開始
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateChips(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    const handleRegister = () => {
        navigate('/register_form');
    };

    const handleLogin = () => {
        navigate('/login');
    }
    
    return (
        <Box 
            sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                py: 8,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* 背景デザイン要素 */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 0
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: 'absolute',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: `${Math.random() * 300 + 50}px`,
                            height: `${Math.random() * 300 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                textAlign: 'left',
                                pr: { md: 4 },
                                animation: 'fadeIn 1s ease-in-out',
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 0 },
                                    '100%': { opacity: 1 },
                                },
                            }}
                        >
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                sx={{ 
                                    color: 'white', 
                                    fontWeight: 800,
                                    mb: 2,
                                    textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                musuBeへようこそ
                            </Typography>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    color: 'white',
                                    mb: 4,
                                    opacity: 0.9,
                                    fontWeight: 400
                                }}
                            >
                                コミュニケーションを通じて新たな発見と交流を促進するプラットフォーム
                            </Typography>

                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: {xs: 'column', sm: 'row'}, 
                                    gap: 2,
                                    mb: 4
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<HowToRegIcon />}
                                    onClick={handleRegister}
                                    sx={{ 
                                        bgcolor: 'white', 
                                        color: 'primary.dark',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.9)',
                                        }
                                    }}
                                >
                                    新規登録
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<LoginIcon />}
                                    onClick={handleLogin}
                                    sx={{ 
                                        borderColor: 'white', 
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                        }
                                    }}
                                >
                                    ログイン
                                </Button>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                                {[
                                    { icon: <ExploreIcon />, text: '新しい発見' },
                                    { icon: <GroupsIcon />, text: 'コミュニティ' },
                                    { icon: <LightbulbIcon />, text: 'アイデア共有' }
                                ].map((item, index) => (
                                    <Zoom 
                                        key={index}
                                        in={animateChips} 
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <Box component="div"> {/* 追加のBoxラッパーでDOM要素を確保 */}
                                            <Chip 
                                                icon={item.icon} 
                                                label={item.text} 
                                                sx={{ 
                                                    bgcolor: 'rgba(255,255,255,0.2)',
                                                    color: 'white',
                                                    borderRadius: '16px',
                                                    px: 1
                                                }} 
                                            />
                                        </Box>
                                    </Zoom>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card 
                            elevation={10} 
                            sx={{ 
                                borderRadius: '24px', 
                                overflow: 'hidden',
                                backdropFilter: 'blur(20px)',
                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                boxShadow: '0 20px 80px rgba(0,0,0,0.2)',
                                transform: 'perspective(1000px) rotateY(-5deg)',
                                transition: 'transform 0.5s ease',
                                '&:hover': {
                                    transform: 'perspective(1000px) rotateY(0deg)',
                                },
                                animation: 'fadeIn 1.5s ease-in-out',
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 0 },
                                    '100%': { opacity: 1 },
                                },
                            }}
                        >
                            <CardContent sx={{ p: 6 }}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    textAlign="center"
                                >
                                    <Typography 
                                        variant="h4" 
                                        gutterBottom 
                                        sx={{ 
                                            color: 'primary.dark', 
                                            fontWeight: 700,
                                            mb: 3
                                        }}
                                    >
                                        始めましょう
                                    </Typography>

                                    <Paper 
                                        elevation={0} 
                                        sx={{ 
                                            p: 2, 
                                            mb: 4, 
                                            borderRadius: '16px', 
                                            background: 'rgba(25, 118, 210, 0.08)',
                                            width: '100%'
                                        }}
                                    >
                                        <Typography variant="body1" color="text.secondary">
                                            アカウントを作成して、すべての機能にアクセスしましょう
                                        </Typography>
                                    </Paper>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleRegister}
                                        startIcon={<HowToRegIcon />}
                                        sx={{ 
                                            mt: 2, 
                                            width: '100%', 
                                            py: 1.5,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        新規登録
                                    </Button>

                                    <Divider sx={{ width: '100%', my: 3, opacity: 0.7 }}>または</Divider>

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleLogin}
                                        startIcon={<LoginIcon />}
                                        sx={{ 
                                            width: '100%', 
                                            py: 1.5,
                                            fontSize: '1rem'
                                        }}
                                    >
                                        ログイン
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default TopPage;
