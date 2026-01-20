import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove item
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  // Buy Now (redirect to order)
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/order-place", { state: cart });
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-center text-dark">Your Cart is Empty 🛒</h2>
        <NavLink to="/products" className="btn btn-light text-center text-decoration-none mt-3">
          Go to Products
        </NavLink>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      <div className="row">
        <div className="col-md-8">
          {cart.map((item, index) => (
            <div
              className="card mb-3 shadow-sm"
              key={index}
            >
              <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid p-2"
                    style={{ height: "120px" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text fw-bold">
                      $ {item.price}
                    </p>
                  </div>
                </div>
                <div className="col-md-3 text-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Summary</h4>
              <hr />
              <p>Total Items: {cart.length}</p>
              <h5>Total Price: $ {totalPrice}</h5>

              <button
                className="btn btn-dark w-100 mt-3"
                onClick={handleCheckout}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
