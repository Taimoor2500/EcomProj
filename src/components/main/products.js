/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../redux/reducers/counter';
import { addToCart } from '../../redux/reducers/cart';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import {
  incrementPagination,
  decrementPagination,
  resetPaginationCounter,
  setTotalPages,
} from '../../redux/reducers/paginationSlice'; 

const ProductCard = ({ searchQuery, sort, page }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const token = session.token;
  const pagination = useSelector((state) => state.pagination);
  const { pageNumber, totalPages } = pagination;

  useEffect(() => {
    fetchProducts();
  }, [page, sort, searchQuery]); // Include searchQuery in the dependencies

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products?page=${page}`);
      const { totalCount, products } = response.data;
      let sorted = [...products];
      if (sort === 'high') {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sort === 'low') {
        sorted.sort((a, b) => a.price - b.price);
      }
      setProducts(sorted);
      setIsLoading(false);
      console.log(totalCount);
      const productsPerPage = 8;
      const totalPages = Math.ceil(totalCount / productsPerPage);


      dispatch(setTotalPages(totalPages)); 
    } catch (error) {
      console.log('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const handleOrder = (product) => {
    if (!token || token.trim() === '') {
      navigate('/login');
      return;
    }

    dispatch(increment());
    dispatch(addToCart(product));
  };

  const isProductOrdered = (product) => {
    return cart.some((cartProduct) => cartProduct._id === product._id);
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery) {
        fetchProducts();
      } else {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/search?query=${searchQuery}`
        );
        const { totalCount, products } = response.data;
        let sorted = [...products];
        if (sort === 'high') {
          sorted.sort((a, b) => b.price - a.price);
        } else if (sort === 'low') {
          sorted.sort((a, b) => a.price - b.price);
        }
        setProducts(sorted);
        setIsLoading(false);
        const productsPerPage = 8;
      const totalPages = Math.ceil(totalCount / productsPerPage);
        dispatch(setTotalPages(totalPages)); 
      }
    } catch (error) {
      console.log('Error searching products:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]); // Only call handleSearch when searchQuery changes

  const handlePageChange = (page) => {
    dispatch(setPageNumber(page)); // Update the current page in pagination slice
  };

  const getProductImage = (product) => {
    const filename = product.image.substring(product.image.lastIndexOf('/') + 1);
    return require(`../../images/${filename}`);
  };

  return (
    <div className="container-fluid my-4">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col md={4} lg={3} key={product._id}>
                <div className="card">
                  <div className="ratio ratio-4x3">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      className="card-img-top img-fluid"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ${product.price}</p>
                    <div className="text-end">
                      <button
                        className={`btn ${
                          isProductOrdered(product) || product.stock === 0 ? 'btn-danger' : 'btn-primary'
                        }`}
                        onClick={() => handleOrder(product)}
                        disabled={isProductOrdered(product) || product.stock === 0}
                      >
                        {isProductOrdered(product)
                          ? 'Ordered'
                          : product.stock === 0
                          ? 'Out of Stock'
                          : 'Order Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductCard;