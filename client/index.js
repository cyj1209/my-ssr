import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../src/App";
import { getClientStore } from "../src/store/store";
import Header from "../src/components/Header";

const Page = (
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Header></Header>
      {routes.map(route => {
        if (!__errorKey[route.key]) {
          return <Route {...route}></Route>;
        }
      })}
    </BrowserRouter>
  </Provider>
);
ReactDom.hydrate(Page, document.getElementById("root"));
