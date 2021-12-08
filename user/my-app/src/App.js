import './css/App.css';
import React from 'react';
import { Header } from './components/header.js'
import { List } from './components/list.js'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className='App'>
      <Header/>
      <List/>
    </div>
  );
}

export default App;
