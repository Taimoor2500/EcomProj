/* eslint-disable react/prop-types */
import { Offcanvas } from 'react-bootstrap';
import React from 'react';

const OrderOffcanvas = ({ show, onHide, selectedOrder }) => {
  // Function to format the date in "dd/mm/yyyy" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Order Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          <h5>Order Number: {selectedOrder.orderNumber}</h5>
          <p>Date: {formatDate(selectedOrder.date)}</p>
          <p>Amount: ${selectedOrder.amount}</p>
          <h6>Products:</h6>
          <ul>
            {selectedOrder.products.map((product) => (
              <li key={product.id}>
                {product.title.name} - {product.color} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OrderOffcanvas;
