import { renderToString } from "react-dom/server";
import express from "express";
import App from "../src/App";

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  // 把react组件，解析成html
  const content = renderToString(App);
  // 为什么这里content可以直接放，不用innerHTML ？ 查看react文档的api
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
