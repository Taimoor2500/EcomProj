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
import Admin from "./components/AdminModule/Admin";
import AuthenticationGuard from "./components/auth/AuthenticationGuard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/payment/PaymentForm";

const stripePromise = loadStripe(
  'pk_test_51NXh2rAXTleCaFVGHkShFccjdQITyHLaEKWcZ1T237s7FNbowtruQum7J8W4WYHFSHvvcmF9A1gJw46wLXispQTQ00O7KQE9em');

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticationGuard>
                <Main />
              </AuthenticationGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/pay"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
