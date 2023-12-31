/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaShoppingBag, FaTimes } from 'react-icons/fa'; 
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearSession } from '../../redux/reducers/sessionSlice';
import { resetCounter } from '../../redux/reducers/counter';
import { setCart } from '../../redux/reducers/cart';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch, onSortOptionChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('');
  const location = useLocation();
  const itemCount = useSelector((state) => state.counter);
  const session = useSelector((state) => state.session);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSearchActive(event.target.value !== ''); 
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery) {
      setSearchActive(true);
      onSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchActive(false);
    onSearch('');
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

  const handleSignOut = () => {
    dispatch(clearSession());
    dispatch(resetCounter());
    dispatch(setCart([]));
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleOrder = () => {
    navigate('/Order');
  };

  const path = session.role === 'admin' ? '/admin' : '/';

  return (
    <div className="container-fluid">
      <nav className="navbar bg-body-tertiary navbar-expand-lg">
        <div className="container-fluid">
          <Link to={path} className="nav-link navbar-brand navbar-brand-custom text-black">
            Ecommerce
          </Link>
          <button
            className={`navbar-toggler ${expanded ? 'collapsed' : ''}`}
            type="button"
            onClick={toggleNavbar}
            aria-expanded={expanded}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <Link to="/Cart" className="nav-link">
                  <div className="d-flex align-items-center">
                    {location.pathname !== '/admin' && (
                      <div className="position-relative d-inline-block me-3">
                        <FaShoppingBag color="black" />
                        {itemCount > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                            {itemCount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                {session.token ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="userDropdown">
                      {session.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                      
                      {/* Render the "Orders" option only if the role is not "admin" */}
                      {session.role !== 'admin' && (
                        <Dropdown.Item onClick={handleOrder}>Orders</Dropdown.Item>
                      )}
                   
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Link to="/login" className="nav-link text-black">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {location.pathname !== '/Cart' && location.pathname !== '/Order' && location.pathname !== '/admin' &&(
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <div className="container-md-fluid">
              <h3 className="custom-heading">Heading</h3>
            </div>

            <div className="d-flex justify-content-end gap-2">
              {searchActive && ( 
                <div className="clear-search-icon" onClick={handleClearSearch}>
                  <FaTimes size={20} color="black" />
                </div>
              )}
              <div className="input-group" style={{ width: '180px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="btn btn-primary" type="button" onClick={handleSearchSubmit}>
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
                <ul className={`dropdown-menu ${sortByOpen ? 'show' : ''}`} aria-labelledby="sortByDropdown">
                  <li>
                    <a
                      className={`dropdown-item ${selectedSortOption === 'low' ? 'active' : ''}`}
                      href="#"
                      onClick={() => handleSortOptionChange('low')}
                    >
                      Low
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${selectedSortOption === 'high' ? 'active' : ''}`}
                      href="#"
                      onClick={() => handleSortOptionChange('high')}
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
