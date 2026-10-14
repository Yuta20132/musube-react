// src/App.tsx
import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import Header from './components/Header/Header';
import Register from './components/accounts/Register/Register';
import TopPage from './components/TopPage/TopPage';
import Login from './components/accounts/Login/Login';
import ForgotPassword from './components/accounts/Login/ForgotPassword';
import ResetPassword from './components/accounts/Login/ResetPassword';
import Search from './components/Search/Search';
import SendEmail from './components/accounts/Register/SendEmail';
import UserActivate from './components/accounts/Register/UserActivate';
import LoginSuccess from './components/accounts/Login/LoginSuccess';
import ThreadsPage from './components/board/Threads/ThreadsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/Notification/NotificationSnackbar';
import Logout from './components/accounts/Login/Logout';
import UserProfile from './components/accounts/UserProfile/UserProfile';
import VerifyProfileUpdate from './components/accounts/UserProfile/VerifyProfileUpdate';
import ThreadsView from './components/board/Threads/ThreadsView';
import Policy from './components/Policy/Policy';
import theme from './theme';
import AdminDashboard from './components/Admin/AdminDashboard';
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
              <Route path="/verify" element={<UserActivate />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/threads_page" element={<Navigate to="/threads_page/1" replace />} />
              <Route path="/threads_page/:categoryId" element={<ThreadsPage />} />
              <Route path="/threads/:id/view" element={<ThreadsView />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/verify-profile" element={<VerifyProfileUpdate />} />
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
              <Route path="/verify-profile" element={<VerifyProfileUpdate />} />
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
