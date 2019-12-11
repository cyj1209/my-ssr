// 模拟接口数据
let express = require("express");
const app = express();

app.get("/api/course/list", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.json({
    code: 0,
    list: [
      { name: "test1", id: 1 },
      { name: "test2", id: 2 },
      { name: "test3", id: 3 },
      { name: "test4", id: 4 }
    ]
  });
});

app.listen(9090, () => {
  console.log("mock api server start at 9090");
});
