/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onSearch, onSortOptionChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const location = useLocation();
  const [itemCount, setItemCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const toggleSortByDropdown = () => {
    setSortByOpen(!sortByOpen);
  };

  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
    setSortByOpen(false); 
    onSortOptionChange(option);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar bg-body-tertiary navbar-expand-lg">
        <div className="container-fluid">
         
            <Link to="/" className="nav-link navbar-brand navbar-brand-custom text-black">
              Ecommerce
            </Link>
        
          <button
            className={`navbar-toggler ${expanded ? "collapsed" : ""}`}
            type="button"
            onClick={toggleNavbar}
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${expanded ? "show" : ""}`}
            id="navbarResponsive"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link to="/Cart" className="nav-link">
                  <div className="position-relative d-inline-block">
                    <FaShoppingBag color="black" />
                    {itemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-black">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {location.pathname !== "/Cart" && location.pathname !== "/Order" && (
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <div className="container-md-fluid">
              <h3 className="custom-heading">Heading</h3>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <div className="input-group" style={{ width: "180px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearchSubmit}
                >
                  Search
                </button>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="sortByDropdown"
                  onClick={toggleSortByDropdown}
                >
                  Sort By
                </button>
                <ul
                  className={`dropdown-menu ${sortByOpen ? "show" : ""}`}
                  aria-labelledby="sortByDropdown"
                >
                  <li>
                    <a
                      className={`dropdown-item ${
                        selectedSortOption === "Low" ? "active" : ""
                      }`}
                      href="#"
                      onClick={() => handleSortOptionChange("low")} 
                    >
                      Low
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${
                        selectedSortOption === "High" ? "active" : ""
                      }`}
                      href="#"
                      onClick={() => handleSortOptionChange("high")} // Add parameter
                    >
                      High
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
