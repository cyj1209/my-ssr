import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/">首页</Link>|<Link to="/about">关于</Link>|
      <Link to="/user">user</Link>|<Link to="/sssssssssssss">not found</Link>
    </div>
  );
}
