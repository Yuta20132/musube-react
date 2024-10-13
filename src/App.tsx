// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // 既存のProtectedRoute

const App: React.FC = () => {
  return (
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
          <Route path="/register" element={<UserActivate />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route 
            path="/threads_page" 
            element={
              <ProtectedRoute>
                <ThreadsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
