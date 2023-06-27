import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FaShoppingBag } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [sortByOpen, setSortByOpen] = useState(false);

  const dropdownStyle = {
    width: '100px',
  };

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const toggleSortByDropdown = () => {
    setSortByOpen(!sortByOpen);
  };

  return (
    <div className='container-fluid'>
      <nav className='navbar bg-body-tertiary navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand navbar-brand-custom' href='#'>
            E-commerce
          </a>
          <button
            className={`navbar-toggler ${expanded ? 'collapsed' : ''}`}
            type='button'
            onClick={toggleNavbar}
            aria-expanded={expanded}
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
            id='navbarResponsive'
          >
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item active'>
                <a className='nav-link' href='#'>
                  <FaShoppingBag />
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  <FaShoppingCart />
                </a>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='nav-link text-black'>Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <div className='container-md-fluid'>
            <h3 className='custom-heading'>Heading</h3>
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <div className='input-group' style={{ width: '180px' }}>
              <input
                type='text'
                className='form-control'
                placeholder='Search...'
              />
              <button className='btn btn-primary' type='button'>
                Search
              </button>
            </div>

            <div
              className={`dropdown ${sortByOpen ? 'show' : ''}`}
              style={dropdownStyle}
            >
              <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                id='sortByDropdown'
                onClick={toggleSortByDropdown}
              >
                Sort By
              </button>
              <ul
                className={`dropdown-menu ${sortByOpen ? 'show' : ''}`}
                aria-labelledby='sortByDropdown'
              >
                <li>
                  <a className='dropdown-item' href='#'>
                    Option 1
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Option 2
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='#'>
                    Option 3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
