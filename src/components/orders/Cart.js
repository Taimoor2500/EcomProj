import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../main/Navbar";
import {
  DeleteButton,
  IncreaseQuantityButton,
  DecreaseQuantityButton,
} from "../orders/commonComponents";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCart,
} from "../../redux/reducers/cart";
import { resetCounter } from "../../redux/reducers/counter";
import { decrement } from "../../redux/reducers/counter";
import axios from "axios";

function generateUniqueNumber() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const paddedNumber = randomNumber.toString().padStart(3, "0");
  return "OR" + paddedNumber;
}

const CartItems = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);
  const { email } = useSelector((state) => state.session);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const remItem = (id) => {
    dispatch(removeFromCart(id));
    setTimeout(() => {
      dispatch(decrement());
      alert(`Item with ID ${id} removed from Cart Successfully!`);
    }, 100);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      dispatch(setCart(cartData));
    }
  }, [dispatch]);

  const getProductImage = (product) => {
    const filename = product.image.substring(
      product.image.lastIndexOf("/") + 1
    );
    return require(`../../images/${filename}`);
  };

  const placeOrder = async () => {
    if (!session.token || session.token.trim() === "") {
      navigate("/login");
      return;
    }

   

    try {
      const products = cart.map((product) => ({
        title: {
          name: product.title,
          image: product.image,
        },
        color: product.color,
        price: product.price,
        quantity: product.quantity || 1,
      }));

      const orderNumber = generateUniqueNumber();
      

      const orderData = {
        email : email,
        date: new Date(),
        orderNumber,
        products,
        amount: calculateTotalAmount(),
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );
      console.log(response.data);

      dispatch(setCart([]));
      dispatch(resetCounter());
      

      navigate("/Order");
    } catch (error) {
      
      console.error("Error placing order:", error);
    }
  };

  const calculateTotalAmount = () => {
    const subTotal = cart.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 1),
      0
    );
    const taxPercentage = 0.1; // 10% tax
    const taxAmount = subTotal * taxPercentage;
    const totalWithTax = subTotal + taxAmount;
    return totalWithTax.toFixed(2);
  };

  const renderTotal = () => {
    const subTotal = cart.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.quantity || 1),
      0
    );
    const taxPercentage = 0.1; // 10% tax
    const taxAmount = subTotal * taxPercentage;
    const totalWithTax = subTotal + taxAmount;

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
                  <thead
                    className="h4 text-white"
                    style={{ background: "lightgrey" }}
                  >
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
                    {cart.map((product) => (
                      <tr
                        className="my-3"
                        style={{ lineHeight: "unset" }}
                        key={product._id}
                      >
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={getProductImage(product)}
                              alt={product.title}
                              style={{ width: "50px", marginRight: "10px" }}
                            />
                            <span>{product.title}</span>
                          </div>
                        </th>
                        <td>{product.color}</td>
                        <td>
                          <DecreaseQuantityButton
                            onClick={() =>
                              dispatch(decreaseQuantity(product._id))
                            }
                          />
                          {product.quantity || 1}
                          <IncreaseQuantityButton
                            onClick={() =>
                              dispatch(increaseQuantity(product._id))
                            }
                          />
                        </td>
                        <td>
                          ${(product.price || 0) * (product.quantity || 1)}
                        </td>
                        <td>
                          <DeleteButton onClick={() => remItem(product._id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="container mt-3 text-end">
                {renderTotal()}
                {cart.length > 0 ? (
                  <button className="btn btn-primary" onClick={placeOrder}>
                    Order Now
                  </button>
                ) : (
                  <p style={{ color: "red" }}>Cart empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
