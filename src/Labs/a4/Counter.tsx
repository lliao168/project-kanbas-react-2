import React, { useState } from "react";
function Counter() {
//   let count = 7;
const [count, setCount] = useState(7);

  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      {/* <button
        onClick={() => { count++; console.log(count); }}>
        Up
      </button>
      <button
        onClick={() => { count--; console.log(count); }}>
        Down
      </button> */}
      <button className="btn btn-success me-2" onClick={() => setCount(count + 1)}>Up</button>
      <button className="btn btn-danger" onClick={() => setCount(count - 1)}>Down</button>
    </div>
  );
}
export default Counter;

