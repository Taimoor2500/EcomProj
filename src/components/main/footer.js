/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const Footer = ({ onPageChange }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (page) => {
    setPageNumber(page);
    onPageChange(page);
  };

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  return (
    <footer className="footer bg-light fixed-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <span className="footer-text">MY products shown</span>
          </div>
          <div className="col-12 col-md-6">
            <nav aria-label="Pagination">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#previous"
                    onClick={() => handlePageChange(pageNumber - 1)}
                  >
                    Previous
                  </a>
                </li>
                <li className={`page-item ${pageNumber === 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#1" onClick={() => handlePageChange(1)}>
                    1
                  </a>
                </li>
                <li className={`page-item ${pageNumber === 2 ? 'active' : ''}`}>
                  <a className="page-link" href="#2" onClick={() => handlePageChange(2)}>
                    2
                  </a>
                </li>
                <li className={`page-item ${pageNumber === 3 ? 'active' : ''}`}>
                  <a className="page-link" href="#3" onClick={() => handlePageChange(3)}>
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#next"
                    onClick={() => handlePageChange(pageNumber + 1)}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
