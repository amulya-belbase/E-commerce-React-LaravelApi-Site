import { useEffect } from "react";
import react from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

 const [product, setProduct] = react.useState("");
 const [manufacturer, setManufacturer] = react.useState("");
 const [price, setPrice] = react.useState("");
 const [quantity, setQuantity] = react.useState("");
 const [tags, setTags] = react.useState("");
 const [pdimg, setPdimg] = react.useState("");
 const [description, setDescription] = react.useState("");

async function handleSubmit(event){
    event.preventDefault();
    let vendor = JSON.parse(localStorage.getItem('vendor-info'))
    let user_id = vendor.id; 
    // console.log(product, manufacturer, price, quantity, tags, pdimg, description, user_id)
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('product', product);
    formData.append('manufacturer', manufacturer);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('tags', tags);
    formData.append('pdimg', pdimg);
    formData.append('description', description);

    let result = await fetch("http://127.0.0.1:8000/api/addproduct",{
        method: "POST",
        body: formData
    });
    alert("Product Saved");
    navigate("/myproducts");
}

  return (
    <div>
      {localStorage.getItem("vendor-info") ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label for="product">Product Name</label>
            <input type="text" onChange={(event) => setProduct(event.target.value)} name="product" />
          </div>

          <div>
            <label for="title">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              placeholder="Example: Audi"
              onChange={(event) => setManufacturer(event.target.value)}
            />
          </div>

          <div>
            <label for="price">Price</label>
            <input type="text" onChange={(event) => setPrice(event.target.value)} name="price" placeholder="In Nrs." />
          </div>

          <div>
            <label for="quantity">Quantity</label>
            <input type="text" onChange={(event) => setQuantity(event.target.value)} name="quantity" />
          </div>

          <div>
            <label for="tags">Tags (Comma Separated)</label>
            <input
              type="text"
              name="tags"
              onChange={(event) => setTags(event.target.value)}
              placeholder="Example: Camera, Lens, Photograph etc"
            />
          </div>

          <div>
            <label for="productimage">Product Image</label>
            <input type="file" onChange={(event) => setPdimg(event.target.files[0])} name="pdimg" />
          </div>

          <div>
            <label for="description">Job Description</label>
            <textarea
              name="description"
              rows="10"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Include product's details"
            ></textarea>
          </div>

          <button>
            Add Product
          </button>

          <a href="/">
            
            Back
          </a>
        </form>
      ) : (
        <div>
          {useEffect(() => {
            navigate("/login");
          })}
        </div>
      )}
    </div>
  );
}
