import React, { useEffect, useState } from "react";
import Header from "./header.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";
import SubTotal from "./subtotal.js";
import { useCart } from "./cartcontext.js";
import { useNavigate } from "react-router-dom";

export default function cart() {

  const navigate = useNavigate();
  const [cart, setCart] = useCart();


  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = parseInt(total) + parseInt(item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };


  const removeItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item.id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart_info", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

function getTotal(data, id){
  console.log("Price is: "+data+" Id is: "+id);
}

  return (
    <div>
      <Header />
      <>
        {localStorage.getItem("vendor-info") ? (
          <div>
            <div className="bodybuttons">
              <Link to="/">
                <button>
                  <i class="fa-solid fa-server"></i>All Products
                </button>
              </Link>

              <Link to="/myproducts">
                <button>
                  <i class="fa-solid fa-box-open"></i>My Products
                </button>
              </Link>

              {localStorage.getItem("vendor-info") ? (
                <Link to="/addproduct">
                  <button>
                    <i class="fa-solid fa-square-plus"></i>Add Product
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>

            <div>
              {cart?.length > 0 && (
                <div className="myproductsbody">
                  <div className="mypdheader">
                    <p>My Cart</p>
                  </div>
                  <div className="mycardcard">
                    {cart.map((item) => (
                      <>
                        <div className="prodelements">
                          <div className="mypdlist">
                            <div className="mypdimagediv">
                              <img
                                src={"http://127.0.0.1:8000/" + item.pdimg}
                                className="mypdimage"
                                alt="Logo"
                              />
                            </div>
                            <div className="mypddetails">
                              {/* <p>User Id: {item.user_id}</p> */}

                              <h2>{item.product}</h2>
                              <div className="mycartdetails">
                                <div>
                                  <p>Manufacturer: {item.manufacturer}</p>
                                  <p>Price: {item.price}</p>
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                                <div>
                                  <p>Tags: {item.tags}</p>
                                  <p>Description: {item.description}</p>
                                </div>
                              </div>
                            </div>
                            <SubTotal data={item.price} getTotal={getTotal} id={item.id}/>
                            <button className="removebutton" onClick={() => removeItem(item.id)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="grandtotalcart">
                    Grand Total: {totalPrice()}
                    {/* {console.log(cart.length)} */}
                  </div>
                  <div className="checkoutbutton">
                    <button>Check-out</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {useEffect(() => {
              navigate("/login");
            })}
          </div>
        )}
        <Footer />
      </>
    </div>
  );
}
