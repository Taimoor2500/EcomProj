import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { clearOrderData } from '../../redux/reducers/orderSlice';
import { setCart } from '../../redux/reducers/cart';
import { resetCounter } from '../../redux/reducers/counter';
import { useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const session = useSelector((state) => state.session);
  const { email } = useSelector((state) => state.session);
  const orderData = useSelector((state) => state.order);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  

  const clearReservationsOnOrder = async () => {
    try {
      const userEmail = session.email;
      console.log(userEmail);
      await axios.delete(`http://localhost:5000/api/products/clearReservationsO/${userEmail}`);
    } catch (error) {
      console.error('Error clearing intervals:', error);
    }
  };

  const clearReservations = async () => {
    try {
      const userEmail = session.email;
      await axios.delete(`http://localhost:5000/api/products/clearReservations/${userEmail}`);
      dispatch(setCart([]));
      dispatch(resetCounter());
    } catch (error) {
      console.error("Error clearing reservations and updating stock:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error.message);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/payment', {
          paymentMethodId: paymentMethod.id,
        });

        const { status } = response.data;

        if (status === 'succeeded') {
         await clearReservationsOnOrder();

      
         
        
          await axios.post('http://localhost:5000/api/orders', orderData[0]);

          
          dispatch(setCart([]));
          dispatch( clearOrderData());
          dispatch(resetCounter());

          setPaymentStatus('success');
          navigate('/Order');
        } else {
          setPaymentStatus('failure');
        }
      } catch (error) {
        console.error('Error sending payment data to backend:', error.message);
        setPaymentStatus('failure');

        await clearReservations();
        dispatch(setCart([]));
          dispatch( clearOrderData());
          dispatch(resetCounter());

      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Payment Details</h2>
            {paymentStatus === 'success' && (
              <div className="alert alert-success">Payment Successful!</div>
            )}
            {paymentStatus === 'failure' && (
              <div className="alert alert-danger">Payment Failed. Please try again.</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
