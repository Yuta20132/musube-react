// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// インポートしたコンポーネント
import Header from './components/Header/Header';
import Register from './components/Accounts/Register/Register';
import TopPage from './components/TopPage/TopPage';
import Login from './components/Accounts/Login/Login';
import ForgotPassword from './components/Accounts/Login/ForgotPassword';
import Search from './components/Search/Search';
import SendEmail from './components/Accounts/Register/SendEmail';
import UserActivate from './components/Accounts/Register/UserActivate';
import LoginSuccess from './components/Accounts/Login/LoginSuccess';
import ThreadsPage from './components/Board/ThreadsPage';
import { AuthProvider } from './contexts/AuthContext';
import Logout from './components/Accounts/Login/Logout';
import UserProfile from './components/Accounts/UserProfile/UserProfile';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; 
import ThreadsView from './components/Board/ThreadsView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#21cbf3',
      dark: '#1976d2',
    },
    background: {
      default: '#ffffff', // 通常の背景色
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: { fontWeight: 'bold' },
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    body1: { fontWeight: 500 },
    body2: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/register_form" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-search" element={<Search />} />
          <Route path="/send-mail" element={<SendEmail />} />
          <Route path="/verify" element={<UserActivate />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route 
            path="/threads_page" 
            element={
              <ProtectedRoute>
                <ThreadsPage />
              </ProtectedRoute>
            }
          />
           <Route path="/threads/view" element={<ThreadsView />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
