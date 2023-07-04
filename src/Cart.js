import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MdDelete, MdAdd, MdRemove } from 'react-icons/md';
import imageSrc from './p2.jpg';

const CartItems = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Mock data to simulate the response from the server
    const mockData = [
      {
        id: 1,
        title: { name: 'Product 1', image: imageSrc },
        color: 'Red',
        price: 1000,
      },
      {
        id: 2,
        title: { name: 'Product 2', image: imageSrc },
        color: 'Blue',
        price: 15,
      },
      {
        id: 3,
        title: { name: 'Product 3', image: imageSrc },
        color: 'Green',
        price: 50,
      },
      {
        id: 4,
        title: { name: 'Product 4', image: imageSrc },
        color: 'Yellow',
        price: 30,
      },
      {
        id: 5,
        title: { name: 'Product 5', image: imageSrc },
        color: 'Black',
        price: 200,
      },
      {
        id: 6,
        title: { name: 'Product 6', image: imageSrc },
        color: 'White',
        price: 25,
      },
      {
        id: 7,
        title: { name: 'Product 7', image: imageSrc },
        color: 'Purple',
        price: 75,
      },
      {
        id: 8,
        title: { name: 'Product 8', image: imageSrc },
        color: 'Orange',
        price: 10,
      },
      // Add more products with unique IDs
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
    const total = cartProducts.reduce(
      (accumulator, product) => accumulator + (product.price || 0) * (product.quantity || 1),
      0
    );
    const taxPercentage = 0.1; // 10% tax
    const tax = total * taxPercentage;
    return {
      subTotal: total,
      taxAmount: tax,
      totalWithTax: total + tax,
    };
  };

  const renderTotal = () => {
    const { subTotal, taxAmount, totalWithTax } = calculateTotal();

    return (
      <div className="text-start">
        <p className="fs-6 mb-2">Subtotal: ${subTotal.toFixed(2)}</p>
        <p className="fs-6 mb-2">Tax: ${taxAmount.toFixed(2)}</p>
        <h5 className="mb-0">Total (with Tax): ${totalWithTax.toFixed(2)}</h5>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="row justify-content-center">
        <div className="col-11 text-center">
          <div className="card mt-5 shadow border-0 rounded-2">
            <div className="card-body">
              <div className="table-wrapper-scroll-y my-custom-scrollbar border-0">
                <table className="table table-responsive">
                  <thead className="h4 text-white" style={{ background: 'lightgrey' }}>
                    <tr>
                      <th scope="col" className="mb-0">
                        Product
                      </th>
                      <th scope="col" className="mb-0">
                        Color
                      </th>
                      <th scope="col" className="mb-0">
                        Quantity
                      </th>
                      <th scope="col" className="mb-0">
                        Price
                      </th>
                      <th scope="col" className="mb-0">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="h5">
                    {cartProducts.map((val, index) => (
                      <tr className="my-3" style={{ lineHeight: 'unset' }} key={index}>
                        <th scope="row">
                          <img src={val.title.image} alt={val.title.name} style={{ width: '50px', marginRight: '10px' }} />
                          {val.title.name}
                        </th>
                        <td>{val.color}</td>
                        <td>
                          <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={() => decreaseQuantity(val.id)}>
                            <MdRemove style={{ color: 'black' }} />
                          </button>
                          {val.quantity || 1}
                          <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={() => increaseQuantity(val.id)}>
                            <MdAdd style={{ color: 'black' }} />
                          </button>
                        </td>
                        <td>${(val.price || 0) * (val.quantity || 1)}</td>
                        <td>
                          <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={() => remItem(val.id)}>
                            <MdDelete style={{ color: 'red' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="container mt-3 text-end">
                
                  
                    {renderTotal()}
                  
                 
                    <button className="btn btn-primary">Order Now</button>
                  
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
