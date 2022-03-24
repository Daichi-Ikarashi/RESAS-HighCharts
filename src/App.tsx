import React from 'react';
import './App.css';
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県別人口推移</h1>
      </header>
      <Main />
    </div>
  );
}

export default App;