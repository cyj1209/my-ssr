import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../src/App";
import store from "../src/store/store";

const app = express();
app.use(express.static("public"));

app.get("*", (req, res) => {
  // 把react组件，解析成html
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>{App}</StaticRouter>
    </Provider>
  );
  // 因为使用的模板支付串
  res.send(`
    <html>
      <head>
        <meta charset='utf-8' />
        <title>my ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src='/bundle.js' ></script>
      </body>
    </html>
    `);
});

app.listen(9003, () => {
  console.log("server start at 9003");
});
