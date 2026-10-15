import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Button, IconButton, ButtonBase, Avatar, Menu, MenuItem, Tooltip, Container } from '@mui/material';
import { Menu as MenuIcon, ExitToApp, Person, ForumOutlined, SearchOutlined } from '@mui/icons-material';
import SideBar from '../SideBar/SideBar';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isLoggedIn, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleLogout = async () => {
    setAnchorEl(null);
    try { await logout(); navigate('/login'); }
    catch { showNotification('ログアウトできませんでした。接続を確認して再試行してください。', 'error'); }
  };
  return (
    <>
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.96)', color: 'text.primary', borderRadius: 0, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: { xs: 1, sm: 2 }, minHeight: { xs: 64, sm: 72 } }}>
            <IconButton aria-label="メニューを開く" aria-expanded={isSidebarOpen} onClick={() => setSidebarOpen(true)} color="primary"><MenuIcon /></IconButton>
            <ButtonBase component={RouterLink} to="/" aria-label="musuBe ホーム">
              <Box component="img" src={`${process.env.PUBLIC_URL}/musube_logo.png`} alt="musuBe" sx={{ height: { xs: 26, sm: 32 }, width: 'auto' }} />
            </ButtonBase>
            <Box sx={{ flexGrow: 1 }} />
            {isLoggedIn ? (
              <>
                <Box component="nav" aria-label="主要メニュー" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                  {[
                    { to: '/threads_page/1', label: '掲示板', icon: <ForumOutlined />, active: pathname.startsWith('/threads') },
                    { to: '/user-search', label: 'ユーザー検索', icon: <SearchOutlined />, active: pathname === '/user-search' },
                  ].map(item => <Button key={item.to} component={RouterLink} to={item.to} startIcon={item.icon} aria-current={item.active ? 'page' : undefined} sx={{ bgcolor: item.active ? '#eaf4f3' : undefined }}>{item.label}</Button>)}
                </Box>
                <Tooltip title="アカウント設定">
                  <IconButton aria-label="アカウント設定" aria-controls={anchorEl ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={Boolean(anchorEl)} onClick={e => setAnchorEl(e.currentTarget)}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}><Person /></Avatar>
                  </IconButton>
                </Tooltip>
                <Menu id="account-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} transformOrigin={{ horizontal: 'right', vertical: 'top' }}>
                  <MenuItem component={RouterLink} to="/profile" onClick={() => setAnchorEl(null)}><Person sx={{ mr: 1.5 }} />プロフィール</MenuItem>
                  <MenuItem onClick={handleLogout}><ExitToApp sx={{ mr: 1.5 }} />ログアウト</MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={RouterLink} to="/login" variant={pathname === '/login' ? 'outlined' : 'contained'} sx={{ px: { xs: 1.5, sm: 3 }, whiteSpace: 'nowrap' }}>ログイン</Button>
            )}
          </Toolbar>
          {isLoggedIn && <Box component="nav" aria-label="モバイル主要メニュー" sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1, pb: 1 }}>
            <Button component={RouterLink} to="/threads_page/1" fullWidth startIcon={<ForumOutlined />} aria-current={pathname.startsWith('/threads') ? 'page' : undefined} sx={{ bgcolor: pathname.startsWith('/threads') ? '#eaf4f3' : undefined }}>掲示板</Button>
            <Button component={RouterLink} to="/user-search" fullWidth startIcon={<SearchOutlined />} aria-current={pathname === '/user-search' ? 'page' : undefined} sx={{ bgcolor: pathname === '/user-search' ? '#eaf4f3' : undefined }}>ユーザー検索</Button>
          </Box>}
        </Container>
      </AppBar>
      <SideBar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      {children}
    </>
  );
};
export default Header;
