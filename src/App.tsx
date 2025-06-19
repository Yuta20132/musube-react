// src/App.tsx
import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
// インポートしたコンポーネント
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
import { AuthProvider } from './contexts/AuthContext';
import Logout from './components/Accounts/Login/Logout';
import UserProfile from './components/Accounts/UserProfile/UserProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 
import ThreadsView from './components/Board/Threads/ThreadsView';
import Policy from './components/Policy/Policy';
import { Box } from '@mui/material';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Header>
          <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
            <Routes>
              {/* １．公開ルート */}
              <Route path="/" element={<TopPage />} />
              <Route path="/register_form" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/user-search" element={<Search />} />
              <Route path="/send-mail" element={<SendEmail />} />
              <Route path="/verify" element={<UserActivate />} />
              <Route path="/login-success" element={<LoginSuccess />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/policy" element={<Policy />} />

              {/* ２．ログイン必須ルートをまとめる */}
              <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/threads_page" element={<ThreadsPage />} />
              <Route path="/threads/view" element={<ThreadsView />} />

                {/* ３．ワイルドカードでキャッチ → ログイン済みなら ThreadsPage、未ログインなら /login */}
              <Route path="*" element={<Navigate to="/threads_page" replace />} />
              </Route>
            </Routes>
          </Box>
        </Header>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
