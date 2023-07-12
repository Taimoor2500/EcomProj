import { useState, useEffect } from 'react';
import Navbar from '../main/Navbar';
import { MdArrowForward } from 'react-icons/md';
import { React, Link, Offcanvas } from './commonImports';
import OrderOffcanvas from './orderDetails';

const Order = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        const data = await response.json();
        setCartProducts(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openOffcanvas = (order) => {
    setSelectedOrder(order);
    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  if (!cartProducts || cartProducts.length === 0) {
    return <div>No orders available.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
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
                        Date
                      </th>
                      <th scope="col" className="mb-0">
                        Order#
                      </th>
                      <th scope="col" className="mb-0">
                        Products
                      </th>
                      <th scope="col" className="mb-0">
                        Amount
                      </th>
                      <th scope="col" className="mb-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="h5">
                    {cartProducts.map((order) => (
                      <tr className="my-3" style={{ lineHeight: 'unset' }} key={order._id}>
                        <td>{formatDate(order.date)}</td>
                        <td>{order.orderNumber}</td>
                        <td>{order.products.length}</td>
                        <td>${order.amount}</td>
                        <td>
                          <button
                            className="btn border-0 rounded-2 shadow-sm mx-2"
                            onClick={() => openOffcanvas(order)}
                          >
                            <MdArrowForward style={{ color: 'black' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedOrder && (
        <OrderOffcanvas show={isOffcanvasOpen} onHide={closeOffcanvas} selectedOrder={selectedOrder} />
      )}
    </div>
  );
};

export default Order;
