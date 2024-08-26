import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 追加されたコンポーネントのインポート
import Header from './components/Header/Header'
import Register from './components/accounts/Register/Register';
import TopPage from './components/TopPage/TopPage';
import Login from './components/accounts/Login/Login';
import ForgotPassword from './components/accounts/Login/ForgotPassword';
import Search from './components/Search/Search';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
