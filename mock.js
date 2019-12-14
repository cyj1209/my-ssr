// 模拟接口数据
let express = require("express");
const app = express();

app.get("/api/user/info1", (req, res) => {
  console.log("here is get user info");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  // res.header("Content-Type", "application/json;charset=utf-8");
  res.json({
    code: 0,
    data: {
      name: "开课吧",
      best: "Wall"
    }
  });
});

app.get("/api/course/list", (req, res) => {
  console.log("here is get list info ");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  // res.header("Content-Type", "application/json;charset=utf-8");
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
