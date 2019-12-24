import Index from "./container/index";
import About from "./container/about";
import User from "./container/user";
import Notfound from "./container/notfound";
// import "./app.css";
// export default (
//   <div>
//     <Route path="/" exact={true} component={Index}></Route>
//     <Route path="/about" exact={true} component={About}></Route>
//   </div>
// );

export default [
  // 这里暂时只能解决服务端渲染的问题。
  {
    path: "/",
    component: Index,
    exact: true,
    key: "index"
  },
  {
    path: "/about",
    component: About,
    exact: true,
    key: "about"
  },
  {
    path: "/user",
    component: User,
    // exact: true,
    key: "user"
  },
  {
    key: "not found ",
    component: Notfound
  }
];
