import './css/App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Main } from './components/main'
import { Page } from './components/page';
import { Reservation } from './components/reservation';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      {/* <Main/> */}
      <Routes>
        <Route path="/user/index.html" element={<Main/>} />
        <Route path="/user/page" element={<Page/>} />
        <Route path="/user/reservation" element={<Reservation/>} />
      </Routes>
    </div>
  );
}

export default App;
