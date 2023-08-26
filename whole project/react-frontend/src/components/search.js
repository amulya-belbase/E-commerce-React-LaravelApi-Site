import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./cartcontext";
import { Badge } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function search(props) {
  let searchvalue = props.data;
  // const [cartNumber, setCartNumber] = useState(0);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = () => {
    fetch("http://127.0.0.1:8000/api/search/" + searchvalue)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSearchResult(data);
      });
  };

  useEffect(() => {
    handleSearch();
  }, [searchvalue]);

  // function handleCart(id) {
  //   if(localStorage.getItem("vendor-info")){
  //   setCartNumber(cartNumber + 1);
  //   alert("Item added to cart");
  //   }else{
  //     alert("You need to login first")
  //     navigate('/login')
  //   }
  // }
  return (
    <div className="allproducts">
      <div className="allpdheader">
        <div className="allpd">All Products</div>
        <div className="cartbutton">
          <Badge count={cart?.length} showZero>
            <Link to="/cart">
              <button className="actualbutton">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </Link>
          </Badge>
        </div>
      </div>
      {searchResult.length > 0 && (
        <div className="productbody">
          {searchResult.map((item) => (
            <div className="pdlist">
              <div className="pdimage">
                <img
                  src={"http://127.0.0.1:8000/" + item.pdimg}
                  className="pdimage"
                  alt="Logo"
                />
              </div>
              <div className="productcard">
                <h2>{item.product}</h2>
                <div className="productdetails">
                  <div className="leftdetails">
                    <p>Manufacturer: {item.manufacturer}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="rightdetails">
                    <p>Tags: {item.tags}</p>
                    <p>Description: {item.description}</p>
                  </div>
                </div>
              </div>
              <div className="pdbutton">
                <button
                  onClick={() => {
                    setCart([...cart, item]);
                    localStorage.setItem('cart_info', JSON.stringify([...cart, item]))
                    toast.success("Product added to cart");
                  }}
                >
                  {" "}
                  <i class="fa-solid fa-cart-plus"></i>Add to cart
                </button>
              </div>
            </div>
          ))}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      )}
    </div>
  );
}
