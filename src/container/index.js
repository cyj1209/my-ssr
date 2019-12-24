import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
import styles from "./index.css";
import withStyle from "../withStyle";

// console.log(styles._getCss());

function Index(props) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (
      !props.list.length &&
      (!window.__errorKey || !window.__errorKey["Index"])
    ) {
      props.getIndexList();
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        my-ssr {props.title || "title is null "}{" "}
      </h1>
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

Index.loadData = store => {
  return store.dispatch(getIndexList());
};

export default connect(
  state => ({
    list: state.index.list
  }),
  {
    getIndexList
  }
)(
  // (Index)
  withStyle(Index)
);
