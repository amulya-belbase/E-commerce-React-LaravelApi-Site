import { react, useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";
import { Link, useNavigate } from "react-router-dom";

export default function MyProducts() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

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

  async function deleteProduct(id){
    let result = await fetch("http://127.0.0.1:8000/api/delete/"+id,{
      method: "DELETE"
    });
    result = await result.json();
    // console.log(result.result);
    fetchProductData();
  }


  if (localStorage.getItem("vendor-info")) {
    let vendor = JSON.parse(localStorage.getItem("vendor-info"));
    let product_id = vendor.id;
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
            {productData.length > 0 && (
              <div className="body">
                {productData.map((item) => (
                  <>
                    {item.user_id == product_id ? (
                      // console.log(product_id);
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

                        <Link to={"update/"+item.id}>
                        <button>Edit</button>
                        </Link>
                        
                        <button onClick={() => deleteProduct(item.id)}>Delete</button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return navigate("/login");
  }
}
