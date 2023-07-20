/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = ({ onPageChange }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const handlePageChange = (page) => {
    setPageNumber(page);
    onPageChange(page);
  };

  useEffect(() => {
   
    fetchTotalProducts();
  }, []);

  const fetchTotalProducts = () => {
   
    axios.get('http://localhost:5000/api/products/count')
      .then((response) => {
        setTotalProducts(response.data.totalCount);

        console.log(totalProducts);
      })
      .catch((error) => {
        console.error('Error fetching total products count:', error);
      });
  };

  const productsPerPage = 8;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

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
                <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                  <a
                    className="page-link"
                    href="#previous"
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={pageNumber === 1}
                  >
                    Previous
                  </a>
                </li>
                {/* Generate pagination numbers dynamically */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${pageNumber === index + 1 ? 'active' : ''}`}
                  >
                    <a
                      className="page-link"
                      href={`#${index + 1}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                  <a
                    className="page-link"
                    href="#next"
                    onClick={() => handlePageChange(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
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
