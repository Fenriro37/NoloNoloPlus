import './css/App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { Product } from './components/product'
import { User } from './components/user';
import { Reservation } from './components/reservation';
import { Invoice } from './components/invoice';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/user/index.html" element={<Product/>}/>
        <Route path="/user/page" element={<User/>}/>
        <Route path="/user/reservation" element={<Reservation/>}/>
      </Routes>
    </div>
  );
}

export default App;
