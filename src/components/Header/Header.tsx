// src/components/Header/Header.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Button, 
  IconButton, 
  ButtonBase,
  Avatar, 
  Menu, 
  MenuItem, 
  Tooltip, 
  Zoom,
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import SideBar from '../SideBar/SideBar';
import { useAuth } from '../../contexts/AuthContext';  // ← ここを追加
import { alpha } from '@mui/material/styles';

// スクロール時にヘッダーを隠す関数
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLoggedIn, logout } = useAuth();   // ← コンテキストから取得
  const navigate = useNavigate();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarOpen = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  const handleLogout = async () => {
    handleMenuClose();
    await logout();               // ← コンテキストの logout を呼ぶ
    navigate('/login');           // ログアウト後は /login へ
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="sticky"
          elevation={0}
          sx={{
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          <Toolbar sx={{ px: { xs:1, sm:2, md:4 } }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={handleSidebarOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <ButtonBase
              onClick={handleLogoClick}
              sx={{ display: 'flex', alignItems: 'center' }}
              aria-label="musuBe ホーム"
            >
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/musube_logo.png`}
                alt="musuBe"
                sx={{ height: { xs: 28, sm: 34 }, width: 'auto' }}
              />
            </ButtonBase>

            <Box sx={{ flexGrow: 1 }} />

            {isLoggedIn ? (
              <>
                <Tooltip title="アカウント設定">
                  <IconButton 
                    onClick={handleMenuOpen}
                    sx={{
                      p: 0,
                      '&:hover': { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.12) }
                    }}
                  >
                    <Avatar sx={{ bgcolor: 'primary.main', width:40, height:40 }}>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '12px',
                      minWidth: 200,
                      boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
                      mt: 1.5,
                      '& .MuiMenuItem-root': { py:1.5, px:2 },
                    },
                  }}
                  transformOrigin={{ horizontal:'right', vertical:'top' }}
                  anchorOrigin={{ horizontal:'right', vertical:'bottom' }}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr:2 }} /> プロフィール
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon sx={{ mr:2 }} /> ログアウト
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Zoom in>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleLogin}
                  sx={{ borderRadius:'24px', px:3 }}
                >
                  ログイン
                </Button>
              </Zoom>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <SideBar open={isSidebarOpen} onClose={handleSidebarClose} />

      {children}
    </>
  );
};

export default Header;
