import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Main from "./components/main/Main";
import Login from "./components/auth/LoginComponent";
import Signup from "./components/auth/SignupComponent";
import Pass from "./components/auth/password";
import Cart from "./components/orders/Cart";
import Order from "./components/orders/Order";
import AuthenticationGuard from "./components/auth/AuthenticationGuard";





const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<AuthenticationGuard><Main /></AuthenticationGuard>} />
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} /> 
          <Route path="/signup" element={<Signup />}/>
          <Route path="/pass" element={<Pass />}/> 
          
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
