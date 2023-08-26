import { useEffect, useState } from "react";
import react from "react";
import Header from "./header";
import Footer from "./footer";
import { useParams, useNavigate } from "react-router-dom";

export default function update() {
  if (localStorage.getItem("vendor-info")) {
    const params = useParams();
    let id = params.id;
    const navigate = useNavigate();
    // console.log(params.id);

    const [productData, setProductData] = useState([]);

    const [product, setProduct] = react.useState("");
    const [manufacturer, setManufacturer] = react.useState("");
    const [price, setPrice] = react.useState("");
    const [quantity, setQuantity] = react.useState("");
    const [tags, setTags] = react.useState("");
    const [pdimg, setPdimg] = react.useState("");
    const [description, setDescription] = react.useState("");

    const fetchProductData = () => {
      fetch("http://127.0.0.1:8000/api/getproduct/" + params.id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProductData(data);
          setProduct(data.product);
          setManufacturer(data.manufacturer);
          setPrice(data.price);
          setQuantity(data.quantity);
          setTags(data.tags);
          setDescription(data.description);
          setPdimg(data.pdimg);
        });
    };

    useEffect(() => {
      fetchProductData();
    }, []);

    async function handleChanges(event) {
      event.preventDefault();
      // console.log(id);
      // console.log(productData);
      // console.log(product, manufacturer, price, quantity, tags, pdimg, description)
      const formData = new FormData();
      formData.append("product", product);
      formData.append("manufacturer", manufacturer);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("tags", tags);
      formData.append("pdimg", pdimg);
      formData.append("description", description);

      let result = await fetch(
        "http://127.0.0.1:8000/api/updateproduct/" + id + "?_method=PUT",
        {
          method: "POST",
          body: formData,
        }
      );
      alert("Product Updated");
      navigate("/myproducts");
    }

    return (
      <div>
        <Header />
        <div className="formbody">
          <div className="addproductheader">
            <div className="togoback">
              <a href="/myproducts">Go Back</a>
            </div>
          </div>
          <div className="formdiv">
            <form onSubmit={handleChanges}>
              <div className="addpdheader">Update Product</div>
              <div>
                <label for="product">Product Name</label>
                <input
                  type="text"
                  onChange={(event) => setProduct(event.target.value)}
                  // onChange={(event) =>
                  //   setProductData({ ...productData, product: event.target.value })
                  // }
                  // onChange={(event) => setProduct(preValue =>{ return{...preValue, [name]:event.target.value}})}
                  name="product"
                  defaultValue={productData.product}
                />
              </div>

              <div>
                <label for="title">Manufacturer</label>
                <input
                  type="text"
                  name="manufacturer"
                  placeholder="Example: Audi"
                  defaultValue={productData.manufacturer}
                  /* onChange={(event) =>
                setProductData({
                  ...productData,
                  manufacturer: event.target.value,
                })
              } */
                  onChange={(event) => setManufacturer(event.target.value)}
                />
              </div>

              <div>
                <label for="price">Price</label>
                <input
                  type="text"
                  defaultValue={productData.price}
                  onChange={(event) => setPrice(event.target.value)}
                  name="price"
                  placeholder="In Nrs."
                />
              </div>

              <div>
                <label for="quantity">Quantity</label>
                <input
                  type="text"
                  defaultValue={productData.quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  name="quantity"
                />
              </div>

              <div>
                <label for="tags">Tags (Comma Separated)</label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={productData.tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="Example: Camera, Lens, Photograph etc"
                />
              </div>

              <div className="imagepart">
                <label for="productimage">Product Image: </label>
                <input
                  type="file"
                  defaultValue={productData.pdimg}
                  onChange={(event) => setPdimg(event.target.files[0])}
                  name="pdimg"
                />
                <br />
                <br />
                <img
                  src={"http://127.0.0.1:8000/" + productData.pdimg}
                  className="pdimage"
                  alt="Logo"
                />
              </div>

              <div>
                <label for="description">Product Description</label>
                <textarea
                  name="description"
                  rows="10"
                  defaultValue={productData.description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Include product's details"
                ></textarea>
              </div>

              <button>Update Product</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    const navigate = useNavigate();
    {
      useEffect(() => {
        navigate("/login");
      });
    }
  }
}
