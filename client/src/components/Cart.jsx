import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {addToCart, removeFromCart , decreaseItemQuantity} from "./productSlice/cartSlice/CartSlice"



function Cart() {
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  function handleCheckout(){
    toast.success("order placed successfully")
   
    localStorage.removeItem("cartItems")
    navigate('/')
    setTimeout(() => {
      window.location.reload()
    }, 800);

  }

  function removeSingleProduct(cartItem){
    dispatch(removeFromCart(cartItem))
  }

  function clearProduct(){
    localStorage.removeItem("cartItems")
   setTimeout(() => {
    window.location.reload()
   }, 500);
  }

  function handleDecrease(cartItem) {
    dispatch(decreaseItemQuantity(cartItem.id));
  }


  function increaseQuantity(cartItem) {
    
    dispatch(addToCart(cartItem));
  }


  function toDetailsPage(id) {
    navigate(`/product/${id}`); 
  }
  return (
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    {cart.cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cart.cartItems &&
            cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product" style={{cursor:'pointer'}} onClick={()=>toDetailsPage(cartItem.id)}>
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div>
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => removeSingleProduct(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onAbort={() => handleDecrease(cartItem)} >
                    -
                  </button>
                  <div className="count">{cartItem.quantity}</div>
                  <button onClick={() => increaseQuantity(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.quantity}
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary">
          <button className="clear-btn" onClick={clearProduct} >
            Clear Cart
          </button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${cart.cartTotalAmount}</span>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <button onClick={handleCheckout}>Check out</button>
            <div className="continue-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}

export default Cart;
