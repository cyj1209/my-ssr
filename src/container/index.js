import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
function Index(props) {
  const [count, setCount] = useState(1);
  // console.log(++count);
  useEffect(() => {
    props.getIndexList();
  }, []);
  return (
    <div>
      <h1>my-ssr {props.title || "title is null "} </h1>
      <p>now count is {count}</p>
      <button onClick={e => setCount(count + 1)}>add</button>
      <hr />
      <ul>
        {props.list.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default connect(
  state => ({
    list: state.index.list
  }),
  {
    getIndexList
  }
)(Index);
