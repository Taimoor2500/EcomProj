/* eslint-disable react/prop-types */
import React from 'react';

const OrderDetailsOffCanvas = ({ order, isOpen, onClose }) => {
  return (
    <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Order Details</h5>
        <button type="button" className="btn-close text-reset" onClick={onClose}></button>
      </div>
      <div className="offcanvas-body">
        <p>Date: {order.date}</p>
        <p>Order #: {order.orderNumber}</p>
        <p>User: {order.email}</p>
        <p>Amount: {order.amount}</p>
        <p>Products: <ul>
            {order.products.map((product) => (
              <li key={product.id}>
                {product.title.name} - {product.color} - Quantity: {product.quantity} 
              </li>
            ))}
          </ul></p>
        
      </div>
    </div>
  );
};

export default OrderDetailsOffCanvas;
