import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import imageSrc from '../../images/p2.jpg';
import { Row, Col } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const ProductCard = ({ searchQuery, sort }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description for Product 1',
      price: 10,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description for Product 2',
      price: 20,
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Description for Product 3',
      price: 15,
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Description for Product 4',
      price: 25,
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Description for Product 5',
      price: 12,
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Description for Product 6',
      price: 18,
    },
    {
      id: 7,
      title: 'Product 7',
      description: 'Description for Product 7',
      price: 22,
    },
    {
      id: 8,
      title: 'Product 8',
      description: 'Description for Product 8',
      price: 30,
    }    
  ];

  useEffect(() => {
    sortProducts();
  }, [sort]);

  const handleOrder = (product) => {
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
  };

  const isProductOrdered = (product) => {
    return selectedProducts.some((selectedProduct) => selectedProduct.id === product.id);
  };

  const sortProducts = () => {
    const sorted = [...products];
    if (sort === 'high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort === 'low') {
      sorted.sort((a, b) => a.price - b.price);
    }
    setSortedProducts(sorted);
  };

  const filteredProducts = sortedProducts.filter((product) =>
    // eslint-disable-next-line react/prop-types
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container-fluid my-4'>
      <Row>
        {filteredProducts.map((product) => (
          <Col md={4} lg={3} key={product.id}>
            <div className='card d-inline-flex'>
              <img src={imageSrc} alt='Image' className='w-100 h-100' />
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>{product.description}</p>
                <p className='card-text'>Price: ${product.price}</p>
                <div className='mt-auto text-end'>
                  <button
                    className={`btn ${isProductOrdered(product) ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => handleOrder(product)}
                    disabled={isProductOrdered(product)}
                  >
                    {isProductOrdered(product) ? 'Ordered' : 'Order Now'}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductCard;
