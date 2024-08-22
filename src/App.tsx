import React from 'react';
import './App.css';

// 追加されたコンポーネントのインポート
import Header from './components/Header/Header'

import Threads from './components/board/threads';


const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Threads />
    </div>
  );
};

export default App;
