// Main.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ProductCard from './products';
import Footer from './footer';

const Main = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar onLinkClick={handleLinkClick} />
      <ProductCard />
      <Footer />
    </div>
  );
};

export default Main;
