import React from "react";
import { Route } from "react-router-dom";

function Status({ code, children }) {
  return (
    <Route
      render={({staticContext}) => {
        console.log("staticContext", staticContext);
        if (staticContext) {
          staticContext.statusCode = code;
        }
        return children;
      }}
    ></Route>
  );
}

export default function notfound(props) {
  console.log("not found", props);
  return (
    <Status code={404}>
      404 not found
      <img src="/404.jpg" alt="not found"></img>
    </Status>
  );
}
