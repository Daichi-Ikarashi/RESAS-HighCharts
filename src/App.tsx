import React from 'react';
import './assets/styles/style.css';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p className='title'>都道府県別人口推移</p>
      </header>
      <Main />
    </div>
  );
}

export default App;