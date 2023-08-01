/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RiArrowRightSLine } from 'react-icons/ri';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTotalPages } from '../../redux/reducers/paginationSlice';
import OrderDetailsOffCanvas from './orderDetail';

const OrderComponent = ({ page }) => {
  const [completeOrders, setCompleteOrders] = useState([]);
  const [Amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const dispatch = useDispatch();

  const fetchOrders = () => {
    axios
      .get(`http://localhost:5000/api/admin/orders?page=${page}`)
      .then((response) => {
        const { orders, totalPages, totalOrders, totalUnits, totalPrice } = response.data;
        setCompleteOrders(orders);
        setCount(totalOrders);
        setAmount(totalPrice);
        setUnit(totalUnits);
        dispatch(setTotalPages(totalPages));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const fetchOrdersBySearchTerm = () => {
    axios
      .get(`http://localhost:5000/api/admin/orders/search?term=${searchTerm}&page=${page}`)
      .then((response) => {
        const { orders, totalPages, totalOrders, totalUnits, totalPrice } = response.data;
        setFilteredOrders(orders);
        dispatch(setTotalPages(totalPages));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (isSearching) {
      fetchOrdersBySearchTerm();
    } else {
      fetchOrders();
    }
  }, [page, isSearching, searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setIsSearching(false);
      setFilteredOrders(completeOrders);
    }
  }, [searchTerm, completeOrders]);

  // Function to toggle off-canvas state and set the selected order
  const handleArrowClick = (order) => {
    setSelectedOrder(order);
    setIsOffCanvasOpen(true);
  };

  return (
    <div className="col-12 col-md-9">
      <Container>
        <Row className="mt-4">
          <Col xs={12} md={4} className="mb-3">
            <div className="square border border-primary p-3 text-center">
              <h4 className="font-weight-bold mb-3">Total Orders</h4>
              <p className="mb-0">{count}</p>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="square border border-primary p-3 text-center">
              <h4 className="font-weight-bold mb-3">Total Units</h4>
              <p className="mb-0">{searchTerm ? unit : unit}</p>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3">
            <div className="square border border-primary p-3 text-center">
              <h4 className="font-weight-bold mb-3">Total Amount</h4>
              <p className="mb-0">$ {searchTerm ? Amount : Amount}</p>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-end">
            <div className="input-group" style={{ width: '230px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button" onClick={handleSearchClick}>
                  Search
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Order #</th>
                  <th>User</th>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.date}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.email}</td>
                    <td>
                      {order.products.map((product, index) => (
                        <div key={index}>
                          {product.title.name} ({product.quantity})
                        </div>
                      ))}
                    </td>
                    <td>${order.amount}</td>
                    <td>
                      <RiArrowRightSLine
                        className="icon-arrow"
                        onClick={() => handleArrowClick(order)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>

      {selectedOrder && (
        <OrderDetailsOffCanvas
          order={selectedOrder}
          isOpen={isOffCanvasOpen}
          onClose={() => setIsOffCanvasOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderComponent;
