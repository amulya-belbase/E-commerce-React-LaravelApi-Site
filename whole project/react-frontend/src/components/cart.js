import React, { useState } from 'react'
import Header from "./header.js";
import Footer from "./footer.js";
import { Link } from "react-router-dom";


export default function cart() {

    let vendor = JSON.parse(localStorage.getItem("cart_info"));





if(vendor.length == 0){
    return(
    <div>No items selected for cart  <Link to="/">
    <button>Return</button>
  </Link></div>
    );
}else{
return (
    <div>
        <Header />
        <div className="bodybuttons">
          <Link to="/">
            <button>All Products</button>
          </Link>

          <Link to="/myproducts">
            <button>My Products</button>
          </Link>

          {localStorage.getItem("vendor-info") ? (
            <Link to="/addproduct">
              <button>Add Product</button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        <div className="forsearch">
        
          <div className="body">
            {vendor.length > 0 && (
              <div className="body">
                {vendor.map((item) => (
                  <>
                    
                      <div className="pdlist">
                        <img
                          src={"http://127.0.0.1:8000/" + item.pdimg}
                          className="pdimage"
                          alt="Logo"
                        />
                        <p>Product Id: {item.id}</p>
                        {/* <p>User Id: {item.user_id}</p> */}
                        <h2>{item.product}</h2>
                        <p>Manufacturer: {item.manufacturer}</p>
                        <p>Tags: {item.tags}</p>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Description: {item.description}</p>

                        
                        
                        <button>Remove</button>
                      </div>
                   
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
  );

}
}

