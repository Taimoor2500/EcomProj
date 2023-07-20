/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../redux/reducers/counter';
import { addToCart } from '../../redux/reducers/cart';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ searchQuery, sort, page }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const token = session.token;

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/products?page=${page}`);
      const data = await response.json();
      setSortedProducts(data);
      setDisplayedProducts(data.slice(0, 8));
      console.log(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sort]);

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

  const sortProducts = () => {
    const sorted = [...sortedProducts];
    if (sort === 'high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === 'low') {
      sorted.sort((a, b) => a.price - b.price);
    }
    setDisplayedProducts(sorted);
  };

  const filteredProducts = displayedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Row>
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
};

export default ProductCard;
