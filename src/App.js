import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from './Main';
import Login from './login';
import Footer from "./footer";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
