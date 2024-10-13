import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 追加されたコンポーネントのインポート
import Header from './components/Header/Header'
import Register from './components/Accounts/Register/Register';
import TopPage from './components/TopPage/TopPage';
import Login from './components/Accounts/Login/Login';
import ForgotPassword from './components/Accounts/Login/ForgotPassword';
import Search from './components/Search/Search';
import SendEmail from './components/Accounts/Register/SendEmail';
import UserActivate from './components/Accounts/Register/UserActivate';
import LoginSuccsess from './components/Accounts/Login/LoginSuccsess';
import ThreadsPage from './components/Board/ThreadsPage';

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
