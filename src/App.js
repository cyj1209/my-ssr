import React, { useState } from "react";
function App(props) {
  const [count, setCount] = useState(1);
  return (
    <div>
      <h1>my-ssr {props.title} </h1>
      <p>now count is {count}</p>
      <button onClick={e => setCount(count + 1)}>add</button>
    </div>
  );
}

export default <App title="hello world" />;
