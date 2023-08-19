import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [productData, setProductData] = useState([]);
const [cartValue, setCartValue] = useState([]);
const [cartNumber, setCartNumber] = useState(0);
  const fetchProductData = () => {
    fetch("http://127.0.0.1:8000/api/allproducts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductData(data);
      });
  };

  useEffect(() => {
    fetchProductData();
  }, []);

function handleCart(id){
  
  setCartValue([...cartValue,id]);
  setCartNumber(cartNumber+1)
  alert("Item added")
  
}  
localStorage.setItem("cart_info", JSON.stringify(cartValue));

return (
    <div>
      <div className="cartbutton">
      <Link to="/cart">
          <button>Cart {cartNumber}</button>
        </Link>
        </div>
      {productData.length > 0 && (
        <div className="body">
          {productData.map((item) => (
            <div className="pdlist">
              <img
                src={"http://127.0.0.1:8000/" + item.pdimg}
                className="pdimage"
                alt="Logo"
              />
              <h2>{item.product}</h2>
              <p>Manufacturer: {item.manufacturer}</p>
              <p>Tags: {item.tags}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Description: {item.description}</p>
              <button onClick={() => handleCart(item)}>Add to cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
