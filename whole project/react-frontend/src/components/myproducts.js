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

  async function deleteProduct(id) {
    let result = await fetch("http://127.0.0.1:8000/api/delete/" + id, {
      method: "DELETE",
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
            <button><i class="fa-solid fa-server"></i>All Products</button>
          </Link>

          <Link to="/myproducts">
            <button><i class="fa-solid fa-box-open"></i>My Products</button>
          </Link>

          {localStorage.getItem("vendor-info") ? (
            <Link to="/addproduct">
              <button><i class="fa-solid fa-square-plus"></i>Add Product</button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
          <div>
            {productData.length > 0 && (
              <div className="myproductsbody">
                <div className="mypdheader">
                  <p>My Products</p>
                  </div>
                {productData.map((item) => (
                  <>
                    {item.user_id == product_id ? (
                      // console.log(product_id);
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
                          <h2>{item.product}</h2>
                          <div>
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
                        <div className="mypdactions">
                          <Link to={"update/" + item.id}>
                            <button className="editbutton">Edit</button>
                          </Link>

                          <button className="deletebutton" onClick={() => deleteProduct(item.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        <Footer />
      </div>
    );
  } else {
    return navigate("/login");
  }
}
