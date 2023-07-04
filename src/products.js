import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import imageSrc from './p2.jpg';
import { Row, Col } from 'react-bootstrap';

const ProductCard = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description for Product 1',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description for Product 2',
    },
    {
      id: 3,
      title: 'Product 1',
      description: 'Description for Product 1',
    },
    {
      id: 4,
      title: 'Product 2',
      description: 'Description for Product 2',
    },
    {
      id: 5,
      title: 'Product 1',
      description: 'Description for Product 1',
    },
    {
      id: 6,
      title: 'Product 2',
      description: 'Description for Product 2',
    },
    {
      id: 17,
      title: 'Product 1',
      description: 'Description for Product 1',
    },
    {
      id: 8,
      title: 'Product 2',
      description: 'Description for Product 2',
    },
    // ... rest of the products
  ];

  const handleOrder = (product) => {
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
  };

  const isProductOrdered = (product) => {
    return selectedProducts.some((selectedProduct) => selectedProduct.id === product.id);
  };

  return (
    <div className='container-fluid my-4'>
      <Row>
        {products.map((product) => (
          <Col md={4} lg={3} key={product.id}>
            <div className='card d-inline-flex'>
              <img src={imageSrc} alt='Image' className='w-100 h-100' />
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>{product.description}</p>
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
