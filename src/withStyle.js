import React from "react";
export default function withStyle(Comp, styles) {
  //   console.log(Comp.getOwnPropertyNames())
  console.log("here is with style");
  console.log(Object.keys(Comp));
  console.log(Object.getOwnPropertyDescriptors(Comp));
  document.get
  return function(props) {
    // 为什么我觉得不用加这个逻辑css任然是正常显示的？
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }
    return <Comp {...props} />;
  };
}
