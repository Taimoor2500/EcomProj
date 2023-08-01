/* eslint-disable react/prop-types */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { incrementPagination, decrementPagination } from '../../redux/reducers/paginationSlice'; // Assuming the file path is correct

const Footer = ({ onPageChange }) => {
  const pagination = useSelector((state) => state.pagination); // Fetch the pagination state from Redux store
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleIncrement = () => {
    dispatch(incrementPagination());
  };

  const handleDecrement = () => {
    dispatch(decrementPagination());
  };

  return (
    <footer className="footer bg-light fixed-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
           
          </div>
          <div className="col-12 col-md-6">
            <Pagination
              pageNumber={pagination.pageNumber} 
              totalPages={pagination.totalPages} 
              onPageChange={handlePageChange}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
