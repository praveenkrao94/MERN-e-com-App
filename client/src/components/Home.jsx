import React, { useEffect ,useState} from "react";

import { useDispatch, useSelector } from "react-redux";
import { productFetch } from "./productSlice/ProductSlice"; // Import your productFetch action
import { Link, useNavigate } from "react-router-dom";
import './home.css'
import { addToCart } from "./productSlice/cartSlice/CartSlice";


function Home() {
  const Navigate = useNavigate(); 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddtoCart = (product)=> {
    dispatch(addToCart(product));
    
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  }
 
  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "failed" ? (
        <div>Failed to fetch products</div>
      ) : (
        <>
        <div className="headdiv">
        <h2 className="headertag">New Arrivals</h2>
        <div className="search-container">
              <input
                type="text"
                placeholder="Search for the name of the product"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
        
        <div className="create_button_container" >
          <Link to={'/createNew'}>
        <button className="createbutton">Create New Product</button>
        </Link>
        </div>
        </div>
       
       

        <div className="product-container">
          {filteredProducts.map((product) => (
          
            <div className="products_items">
              <div className="product_img">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt="" />
                </Link>
              </div>
              <p className="products_name">Product: {product.name}</p>
              <p className="products_offer" style={{ color: "#  007185" }}>
                Feature : {product.desc}
              </p>
              <p className="products_price">Price :${product.price}</p>
              <button onClick={()=> handleAddtoCart(product)}>Add to cart</button>
            
            </div>
          
          ))}
        </div>
        </>
      )}
    </div>
      
  );
}

export default Home;



