// src/components/Header/Header.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../SideBar/SideBar';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {

    navigate('/logout');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          <h1 className="text-2xl font-bold">musuBe</h1>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          
          {isAuthenticated ? (
            <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={handleLogout}>
              ログアウト
            </Button>
          ) : (
            <Button color="inherit" sx={{ fontWeight: 'bold' }} onClick={handleLogin}>
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <SideBar open={isSidebarOpen} onClose={handleSidebarClose} />
    </Box>
  );
};

export default Header;
