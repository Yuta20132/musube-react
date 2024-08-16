import React from 'react';
import './App.css';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 追加されたコンポーネントのインポート

import Register from './components/accounts/Register/Register';
import Login from './components/accounts/Login/Login';



function App() {
  return (
    <div className="App">
      
      <Login />
      

    </div>
  );
}

export default App;
