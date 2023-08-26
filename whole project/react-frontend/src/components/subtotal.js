import React from "react";
import { useState, useEffect } from "react";

function subtotal({ data, getTotal, id }) {
  let price = data;

  const [count, setCount] = useState(1);

  function handleIncrement() {
    setCount((prevCount) => {
      return (prevCount += 1);
    });
  }

  function handleDecrement() {
    setCount((prevCount) => {
      if (prevCount > 1) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 1);
      }
    });
  }

  useEffect(() => {
    setTotalAmount();
  }, [count]);

  function setTotalAmount() {
    getTotal(count * price, id);

  }

  return (
    <div className="mycartaction">
      <div className="fornumber">
        <div class="number">
          <span class="minus" onClick={handleDecrement}>
            -
          </span>

          <input type="text" value={count} />
          <span class="plus" onClick={handleIncrement}>
            +
          </span>
        </div>
      </div>
      <br />
      <br />
      <div id="subtotaldiv">Subtotal: {count * price}</div>
    </div>
  );
}

export default subtotal;
