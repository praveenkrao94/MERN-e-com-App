import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFetch } from "./productSlice/ProductSlice";
import { Link} from "react-router-dom";
import "./home.css";
import { addToCart } from "./productSlice/cartSlice/CartSlice";

function Home() {
 
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("All");
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "All") {
      setSort("All");
      setFilteredCategoryProducts([]);
    } else {
      setSort(selectedCategory);
    }
  };

  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  useEffect(() => {
    if (sort === "All") {
      setFilteredCategoryProducts(products); // Display all products if "All" is selected
    } else {
      setFilteredCategoryProducts(products.filter((product) => product.category === sort));
    }
  }, [products, sort]);

  const filteredProducts = filteredCategoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = sort === "All" ? filteredProducts : filteredCategoryProducts;

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
            <div className="searchAndsort">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search for the name of the product"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="sort-container">
                <label htmlFor="sortBy">Sort By:</label>
                <select id="sortBy" value={sort} onChange={handleCategoryChange}>
                  <option value="All">All</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Laptop">Laptop</option>
                </select>
              </div>
            </div>
            {/* <div className="create_button_container">
              <Link to={"/createNew"}>
                <button className="createbutton">Create New Product</button>
              </Link>
            </div> */}
          </div>
          <div className="product-container">
            {displayedProducts.map((product) => (
              <div className="products_items" key={product.id}>
                <div className="product_img">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt="" />
                  </Link>
                </div>
                <p className="products_name">{product.name}</p>
                <p className="products_offer" style={{ color: "#007185" }}>
                  Feature: {product.desc}
                </p>
                <p className="products_price">Price: ${product.price}</p>
                <button onClick={() => handleAddtoCart(product)}>Add to cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
