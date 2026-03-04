// src/App.tsx
import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import Header from './components/Header/Header';
import Register from './components/Accounts/Register/Register';
import TopPage from './components/TopPage/TopPage';
import Login from './components/Accounts/Login/Login';
import ForgotPassword from './components/Accounts/Login/ForgotPassword';
import ResetPassword from './components/Accounts/Login/ResetPassword';
import Search from './components/Search/Search';
import SendEmail from './components/Accounts/Register/SendEmail';
import UserActivate from './components/Accounts/Register/UserActivate';
import LoginSuccess from './components/Accounts/Login/LoginSuccess';
import ThreadsPage from './components/Board/Threads/ThreadsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/Notification/NotificationSnackbar';
import Logout from './components/Accounts/Login/Logout';
import UserProfile from './components/Accounts/UserProfile/UserProfile';
import ThreadsView from './components/Board/Threads/ThreadsView';
import Policy from './components/Policy/Policy';
import theme from './theme';
const LoadingSpinner: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

// ルーティングコンポーネント
const AppRoutes: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Header>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        <Routes>
          {isLoggedIn ? (
            // ログイン済みユーザー用ルート
            <>
              <Route path="/" element={<Navigate to="/threads_page/1" replace />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/threads_page" element={<Navigate to="/threads_page/1" replace />} />
              <Route path="/threads_page/:categoryId" element={<ThreadsPage />} />
              <Route path="/threads/view" element={<ThreadsView />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/user-search" element={<Search />} />
            </>
          ) : (
            // ゲストユーザー用ルート
            <>
              <Route path="/" element={<TopPage />} />
              <Route path="/register_form" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/send-mail" element={<SendEmail />} />
              <Route path="/verify" element={<UserActivate />} />
              <Route path="/login-success" element={<LoginSuccess />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Box>
    </Header>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AuthProvider>
          <AppRoutes />
          <NotificationSnackbar />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
