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

  const renderPageNumbers = () => {
    const MAX_VISIBLE_PAGES = 3;
    const visiblePages = [];
    const firstVisiblePage = Math.max(1, activePage - 1);
    const lastVisiblePage = Math.min(totalPages, firstVisiblePage + MAX_VISIBLE_PAGES - 1);

    for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
      visiblePages.push(i);
    }

    const renderEllipsis = lastVisiblePage < totalPages ? (
      <li key="ellipsis" className="page-item">
        <a className="page-link" href="#ellipsis" onClick={() => handlePageClick(lastVisiblePage + 1)}>
          ...
        </a>
      </li>
    ) : null;

    return visiblePages.map((pageNumber) => (
      <li key={pageNumber} className={`page-item ${activePage === pageNumber ? 'active' : ''}`}>
        <a className="page-link" href={`#${pageNumber}`} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </a>
      </li>
    )).concat(renderEllipsis);
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
        {renderPageNumbers()}
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
