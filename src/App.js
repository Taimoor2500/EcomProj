import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from './Main';
import Login from './ValidationComp';
import Cart from './Cart';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path ='/Cart' element={<Cart/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
