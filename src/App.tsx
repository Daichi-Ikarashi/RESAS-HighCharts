import React from 'react';
import './assets/styles/style.css';
import Main from './components/Main';

// headerを表示して、Main.tsx呼び出す
const App = () => {
  return (
    <div>
      <header className="App-header">
        <p className='title'>都道府県別人口推移</p>
      </header>
      <Main />
    </div>
  );
}

export default App;