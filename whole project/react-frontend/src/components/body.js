import react, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AllProducts from "./allproducts";
import Search from "./search";
import Cart from "./cart";

export default function Body() {

  const [inputValue, setInputValue] = useState();

  // let value = JSON.parse(localStorage.getItem("cart_info"));

  // const [cartValue, setCartValue] = useState();
  // const [state, setState] = useState({});

  // useEffect(()=>{
  //   setState({count: value.length})
  // },[])

  // const[searchValue, setSearchValue] = useState();
// if you need to pass the final value to search component and not the concurrent changes
  // const [key, setKey] = useState();

//   function handleSubmit(event){
//     event.preventDefault();
//     if(inputValue == undefined){
//       alert("You need to type")
//     }else{
//       // setKey(1);
//       setSearchValue(inputValue)
//       // console.log(key, searchValue)



  return (
    <div>
      <div className="bodybuttons">
        <Link to="/">
          <button>All Products</button>
        </Link>

        {localStorage.getItem("vendor-info") ? (
          <Link to="/myproducts">
            <button>My Products</button>
          </Link>
        ) : (
          <div></div>
        )}
        {localStorage.getItem("vendor-info") ? (
          <Link to="/addproduct">
            <button>Add Product</button>
          </Link>
        ) : (
          <div></div>
        )}
        
      </div>
      <div className="forsearch">
        <div className="searchcontainer">
          <input
            type="text"
            name="search"
            id="searchvalue"
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search for Products..."
          />
          {/* <button type="submit" onClick={handleCart}>Cart {cartValue}</button> */}
        </div>
        <div className="body">
          {inputValue ? <Search data={inputValue} /> : <AllProducts />}
         
        </div>
      </div>
    </div>
  );
}
