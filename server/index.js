import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../src/App";
import { getServerStore } from "../src/store/store";
import Header from "../src/components/Header";
import http from "http";
import Axios from "axios";
const store = getServerStore();
const app = express();
app.use(express.static("public"));

app.get("*", (req, res) => {
  // 根据路由拿到需要获取的组件，并且拿到loadData的方法并且获取到数据

  console.log(req.url);
  if (req.url.startsWith("/api")) {
    console.log("here is starts with api");

    const { method, path, headers, params, body } = req;
    // console.log("method :", method);
    // console.log("path :", path);
    // console.log("headers :", headers);
    // console.log("params :", params);
    // console.log("body :", body);
    Axios({
      method,
      headers,
      params,
      data: body,
      url: "http://localhost:9090" + path
    }).then(
      result => {
        console.log("1111111111111111");
        console.log(result);
        res.json(result.data);
      },
      err => {
        console.log("err!!!");
        res.status(500).send(err);
      }
    );

    return;
  }
  const promises = [];
  // 保存错误路由的key
  const errorKey = {};
  routes.forEach(route => {
    const match = matchPath(req.path, route);
    if (match) {
      const { loadData } = route.component;
      if (loadData) {
        promises.push(
          new Promise(resolve => {
            loadData(store)
              .then(res => {
                // 返回成功标志位
                resolve("SUCCESS");
              })
              .catch(err => {
                console.log(err);
                errorKey[route.key] = true;
                // 出错了返回错误标志位
                resolve("ERROR");
              });
          })
        );
      }
    }
  });
  Promise.all(promises).then(resArray => {
    if (resArray.some(flag => flag === "SUCCESS")) {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <Header></Header>
            {routes.map(route => {
              if (!errorKey[route.key]) {
                return <Route {...route}></Route>;
              }
            })}
          </StaticRouter>
        </Provider>
      );
      res.send(`
      <html>
        <head>
          <meta charset='utf-8' />
          <title>my ssr</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context=${JSON.stringify(store.getState())}
            window.__errorKey = ${JSON.stringify(errorKey)}
          </script>
          <script src='/bundle.js' ></script>
        </body>
      </html>
      `);
    } else {
      res.send("500 Internal Server Error");
    }
  });
});

app.listen(9003, () => {
  console.log("server start at 9003");
});
