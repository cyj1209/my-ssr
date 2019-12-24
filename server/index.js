import React from "react";
import Axios from "axios";
import path from "path";
import fs from "fs";
import express from "express";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route, Switch } from "react-router-dom";
import routes from "../src/App";
import { getServerStore } from "../src/store/store";
import Header from "../src/components/Header";

const store = getServerStore();
const app = express();
app.use(express.static("public"));

function csrRender(res) {
  const filename = path.resolve(process.cwd(), "public/index.csr.html");
  const html = fs.readFileSync(filename, "utf-8");
  return res.send(html);
}

app.get("*", (req, res) => {
  // 根据路由拿到需要获取的组件，并且拿到loadData的方法并且获取到数据
  if (req.query._mode === "csr") {
    return csrRender(res);
  }
  if (req.url.startsWith("/api")) {
    let { method, path, headers, params, body } = req;
    if (method.toLowerCase() === "get") {
      if (path.indexOf("?") === -1) {
        path += `?date=${Date.now()}`;
      } else {
        path += `&date=${Date.now()}`;
      }
    }
    Axios({
      method,
      headers,
      params,
      data: body,
      url: "http://localhost:9090" + path,
      validateStatus: function(status) {
        return status < 400;
      }
    }).then(
      result => {
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
    const context = {
      css: []
    };
    if (resArray.some(flag => flag === "SUCCESS") || resArray.length === 0) {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header></Header>
            <Switch>
              {routes.map(route => {
                if (!errorKey[route.key]) {
                  return <Route {...route} key={route.key}></Route>;
                }
              })}
            </Switch>
          </StaticRouter>
        </Provider>
      );
      console.log("context", context);
      if (context.statusCode) {
        res.status(context.statusCode);
      }
      if (context.action === "REPLACE") {
        res.redirect(301, context.url);
      }

      const css = context.css.join("\n");

      res.send(`
      <html>
        <head>
          <meta charset='utf-8' />
          <title>my ssr</title>
          <style>
            ${css}
          </style>
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
