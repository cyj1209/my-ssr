import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserInfo } from "../store/user";
function User(props) {
  console.log(props);
  useEffect(() => {
    if (!props.userInfo.name && !__errorKey.user) {
      console.log("here is get user info");
      props.getUserInfo();
    }
  }, []);
  return (
    <div
      style={{
        display: props.userInfo && props.userInfo.isError ? "none" : "block"
      }}
    >
      <h1>
        hello {props.userInfo.name},i'm {props.userInfo.best}
      </h1>
    </div>
  );
}

User.loadData = store => {
  return store.dispatch(getUserInfo());
};

export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  { getUserInfo }
)(User);
