import React, { useState, useEffect } from "react";

export default function search(props) {
  let searchvalue = props.data;
  // console.log(searchvalue)
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

  // console.log(searchResult);

  return (
    <div>
      {searchResult.length > 0 && (
        <div className="body">
          {searchResult.map((item) => (
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
              <button>Add to cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
