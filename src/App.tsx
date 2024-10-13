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
import SendEmail from './components/accounts/Register/SendEmail';
import UserActivate from './components/accounts/Register/UserActivate';
import LoginSuccsess from './components/accounts/Login/LoginSuccsess';
import ThreadsPage from './components/board/ThreadsPage';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/register_form" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user-search" element={<Search />} />
          <Route path="/send-mail" element={<SendEmail />} />
          <Route path="/register" element={<UserActivate />} />
          <Route path="login-success" element= {<LoginSuccsess />} />
          <Route path="threads_page" element={<ThreadsPage />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
