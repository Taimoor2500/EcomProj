import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Main from "./components/main/Main";
import Login from "./components/auth/ValidationComp";
import Cart from "./components/orders/Cart";
import Order from "./components/orders/Order";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
