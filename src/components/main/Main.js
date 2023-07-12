import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProductCard from "../main/products";
import Footer from "./footer";

const Main = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  return (
    <div>
      <Navbar
        onLinkClick={handleLinkClick}
        onSearch={handleSearch}
        onSortOptionChange={handleSortOptionChange}
      />
      <ProductCard searchQuery={searchQuery} sort={sortOption} page={pageNumber} />
      <Footer onPageChange={handlePageChange} />
    </div>
  );
};

export default Main;
