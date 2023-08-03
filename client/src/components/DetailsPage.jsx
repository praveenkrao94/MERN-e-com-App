import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Details.css';
import { useSelector, useDispatch } from 'react-redux';
import { productFetch } from './productSlice/ProductSlice'; // Update the path to your productSlice file
import { addToCart } from "./productSlice/cartSlice/CartSlice";


function DetailsPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  
const navigate = useNavigate()


  const handleAddtoCart = (product)=> {
    dispatch(addToCart(product));
    
    navigate('/cart')
  }

  useEffect(() => {
    // Fetch the products when the component mounts
    dispatch(productFetch());
  }, [dispatch]);

  // Find the product with the specified id from the URL params
  const product = products.find((p) => p.id === parseInt(params.id));

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>

<div className='cart_section'>
        <div className="cart_container">
            <div className="left_cart">
                <img src={product.image} alt="" />
                <div className="cart_btn">
                    <button className='cart_btn1' onClick={()=> handleAddtoCart(product)}>Add to Cart</button>
                    <button className='cart_btn2'onClick={()=> handleAddtoCart(product)}>But Now</button>
                </div>
            </div>
            <div className="right_cart">
                <h3>{product.name}</h3>
                
                <hr />
                <p className="mrp">M.R.P : : ${product.ActualPrice}</p>
                <p>Deal of the Day : : <span style={{ color: "red" }}> ${product.price}</span></p>
           
                <div className='discount_box' >
                    <h5>Discount : : <span style={{ color: "red" }}>Extra {product.save} </span></h5>
                    <h4>Free Delivery : <span style={{ color: "#111" , fontWeight:600 }}>Oct 8 - 21 <a href="">Details</a></span></h4>
                    <p>Fastest delivery: <span style={{ color: "#111" , fontWeight:600 }}>Tomorrow 11Am</span></p>
                </div>
                <hr />
                <p className="description">
                <p><b>About the Warranty: : </b>{product.ProductInfo}</p>
                </p>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default DetailsPage