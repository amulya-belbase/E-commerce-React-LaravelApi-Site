import { useEffect } from "react";
import react from "react";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";


export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = react.useState({
    product: "",
    manufacturer: "",
    price: "",
    quantity: "",
    tags: "",
    pdimg: "",
    description: "",
    user_id: "",
  });
  const [formErrors, setFormErrors] = react.useState({});
  const [isSubmit, setIsSubmit] = react.useState(false);

  function handleChange(event) {
    let vendor = JSON.parse(localStorage.getItem("vendor-info"));
    const { name, value, type, files } = event.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: type === "file" ? files[0] : value,
        user_id: vendor.id,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  function validate(values) {
    const errors = {};
    if (!values.product) {
      errors.product = "Enter the product's name";
    }
    if (!values.manufacturer) {
      errors.manufacturer = "Enter the product's manufacturer";
    }
    if (!values.price) {
      errors.price = "Enter the product's price";
    }
    if (!values.quantity) {
      errors.quantity = "Enter the product's quantity";
    }
    if (!values.tags) {
      errors.tags = "Enter the product's tags";
    }
    if (!values.pdimg) {
      errors.pdimg = "Enter the product's image";
    }
    if (!values.description) {
      errors.description = "Enter the product's description";
    }
    return errors;
  }

  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleAddProduct(formData);
    }
  }, [formErrors]);

  async function handleAddProduct(formData) {
    // console.log(formData);
    const form = new FormData();
    form.append("user_id", formData.user_id);
    form.append("product", formData.product);
    form.append("manufacturer", formData.manufacturer);
    form.append("price", formData.price);
    form.append("quantity", formData.quantity);
    form.append("tags", formData.tags);
    form.append("pdimg", formData.pdimg);
    form.append("description", formData.description);

    let result = await fetch("http://127.0.0.1:8000/api/addproduct", {
      method: "POST",
      body: form,
    });
    alert("Product Saved");
    navigate("/myproducts");
  }

  return (
    <div>
      <Header />
      <>
        {localStorage.getItem("vendor-info") ? (
          <div className="formbody">
            <div className="addproductheader">
              <div className="togoback">
                <a href="/myproducts">Go Back</a>
              </div>
            </div>
            <div className="formdiv">
              <form onSubmit={handleSubmit}>
                <div className="addpdheader">Add New Product</div>
                <div>
                  <label for="product">Product Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="product"
                    style={{ marginBottom: "0px" }}
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.product}
                  </p>
                </div>

                <div>
                  <label for="title">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    placeholder="Example: Audi"
                    onChange={handleChange}
                    style={{ marginBottom: "0px" }}
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.manufacturer}
                  </p>
                </div>

                <div>
                  <label for="price">Price</label>
                  <input
                    type="text"
                    style={{ marginBottom: "0px" }}
                    onChange={handleChange}
                    name="price"
                    placeholder="In USD."
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.price}
                  </p>
                </div>

                <div>
                  <label for="quantity">Quantity</label>
                  <input
                    type="text"
                    style={{ marginBottom: "0px" }}
                    onChange={handleChange}
                    name="quantity"
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.quantity}
                  </p>
                </div>

                <div>
                  <label for="tags">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    name="tags"
                    style={{ marginBottom: "0px" }}
                    onChange={handleChange}
                    placeholder="Example: Camera, Lens, Photograph etc"
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.tags}
                  </p>
                </div>

                <div className="imagepart">
                  <label for="productimage">Product Image: </label>
                  <input
                    type="file"
                    style={{ marginBottom: "0px" }}
                    onChange={handleChange}
                    name="pdimg"
                  />
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.pdimg}
                  </p>
                </div>

                <div>
                  <label for="description">Product Description</label>
                  <textarea
                    name="description"
                    rows="10"
                    onChange={handleChange}
                    style={{ marginBottom: "0px" }}
                    placeholder="Include product's details"
                  ></textarea>
                  <p
                    classname="errorsmsg"
                    style={{ color: "red", fontSize: "17px", marginTop: "0px" }}
                  >
                    {formErrors.description}
                  </p>
                </div>

                <button>Add Product</button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            {useEffect(() => {
              navigate("/login");
            })}
          </div>
        )}
      </>
      
      <Footer />
    </div>
  );
}
