/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const Pagination = ({ pageNumber, totalPages, onPageChange }) => {
  const [activePage, setActivePage] = useState(pageNumber);

  useEffect(() => {
    setActivePage(pageNumber);
  }, [pageNumber]);

  const handlePageClick = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-end mb-0">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#previous"
            onClick={() => handlePageClick(activePage - 1)}
            disabled={activePage === 1}
          >
            Previous
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index} className={`page-item ${activePage === index + 1 ? 'active' : ''}`}>
            <a className="page-link" href={`#${index + 1}`} onClick={() => handlePageClick(index + 1)}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#next"
            onClick={() => handlePageClick(activePage + 1)}
            disabled={activePage === totalPages}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
