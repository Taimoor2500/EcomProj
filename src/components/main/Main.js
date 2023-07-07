import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "../main/products";
import Footer from "./footer";

const Main = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <Navbar
        onLinkClick={handleLinkClick}
        onSearch={handleSearch}
        onSortOptionChange={handleSortOptionChange}
      />
      <ProductCard searchQuery={searchQuery} sort={sortOption} />
      <Footer />
    </div>
  );
};

export default Main;
