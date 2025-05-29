import React from "react";
import { 
  Button, 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Avatar,
  Fade,
  useTheme
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={800}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              width: '100%',
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            }}
          >
            <Avatar
              sx={{
                mb: 2,
                bgcolor: theme.palette.primary.main,
                width: 56,
                height: 56
              }}
            >
              <LogoutIcon fontSize="large" />
            </Avatar>
            
            <Typography 
              variant="h4" 
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              ログアウト
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary"
              mb={4}
              textAlign="center"
            >
              アカウントからログアウトしますか？
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                marginTop: 2, 
                width: '100%',
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                '&:hover': {
                  boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }}
            >
              ログアウト
            </Button>
            
            <Button
              variant="text"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ 
                marginTop: 2,
                textTransform: 'none'
              }}
            >
              キャンセル
            </Button>
          </Paper>
        </Box>
      </Fade>
    </Container>
  );
};

export default Logout;