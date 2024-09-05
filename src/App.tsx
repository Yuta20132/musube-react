import React from 'react';
import './App.css';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 追加されたコンポーネントのインポート
import Header from './components/Header/Header'
import Register from './components/accounts/Register/Register';
import Login from './components/accounts/Login/Login';
import UserProfile from './components/accounts/UserProfile/UserProfile';



function App() {
  return (
    <div className="App">
      <UserProfile />
      

    </div>
  );
}

export default App;
