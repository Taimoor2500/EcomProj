import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const OrderDetails = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Mock data to simulate the response from the server
    const mockData = [
      // ... (same as before)
    ];

    setCartProducts(mockData);
  }, []);

  const remItem = (id) => {
    const updatedCart = cartProducts.filter((product) => product.id !== id);
    setCartProducts(updatedCart);
    alert(`Item with ID ${id} removed from Cart Successfully!`);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: (product.quantity || 1) + 1,
        };
      }
      return product;
    });
    setCartProducts(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartProducts.map((product) => {
      if (product.id === id && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    setCartProducts(updatedCart);
  };

  const calculateTotal = () => {
    // ... (same as before)
  };

  const renderTotal = () => {
    // ... (same as before)
  };

  const handleOrderNow = () => {
    if (cartProducts.length === 0) {
      alert('Your cart is empty. Please add some products to place an order.');
      return;
    }

    // Add the cart products to the list of orders
    setOrders((prevOrders) => [...prevOrders, ...cartProducts]);

    // Clear the cart after placing the order
    setCartProducts([]);
    alert('Order placed successfully! Thank you for your purchase.');
  };

  return (
    <div>
      <Navbar />
      {/* ... (same as before) */}
      <div className="container mt-3 text-end">
        {renderTotal()}
        <button className="btn btn-primary" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
      {/* ... (same as before) */}
    </div>
  );
};

export default OrderDetails;
