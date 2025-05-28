import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
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
import { AuthContext } from '../../contexts/AuthContext';
import { styled } from '@mui/material/styles';

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

// スタイル付きのロゴタイポグラフィ
const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: 1,
  background: 'linear-gradient(90deg, #2196f3 0%, #64b5f6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
}));

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/logout');
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
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
          }}
        >
          <Toolbar sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
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
            
            <LogoTypography 
              variant="h5" 
              noWrap 
              onClick={handleLogoClick}
            >
              musuBe
            </LogoTypography>

            <Box sx={{ flexGrow: 1 }} />
            
            {isAuthenticated ? (
              <>
                <Tooltip title="アカウント設定">
                  <IconButton 
                    onClick={handleMenuOpen}
                    sx={{ 
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.1)'
                      }
                    }}
                  >
                    <Avatar 
                      alt="ユーザーアイコン" 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      borderRadius: '12px',
                      minWidth: '200px',
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                      mt: 1.5,
                      '& .MuiMenuItem-root': {
                        py: 1.5,
                        px: 2
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr: 2 }} />
                    プロフィール
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon sx={{ mr: 2 }} />
                    ログアウト
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
                  sx={{ 
                    borderRadius: '24px',
                    px: 3
                  }}
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
