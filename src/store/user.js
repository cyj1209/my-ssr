import axios from "axios";
const GET_LIST = "INDEX/USER_INFO";
const SET_ERROR = "USER/ERROR";

const changeUserInfo = data => ({
  type: GET_LIST,
  data
});

const setUserError = () => ({
  type: SET_ERROR
});

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get("http://localhost:9003/api/user/info").then(
      res => {
        console.log("success");
        const { data } = res.data;
        console.log("hre is get user result");
        console.log(data);
        dispatch(changeUserInfo(data));
      },
      err => {
        // 客户端发生错误，日志记录
        console.log("err!!");
        dispatch(setUserError());
        // 最终就是写成一个中间件，每个请求先到中间件中记录每个请求的状况
        // 如果错误捕获的话我必须用洋葱模型的await 来捕获每一层的错误
        // 如果所有的请求都出错了怎么解决？会有这种情况吗？
        // 没有思路
        throw err;
      }
    );
  };
};

const defaultState = {
  userInfo: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        userInfo: action.data
      };
    case SET_ERROR:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          isError: true
        }
      };
    default:
      return state;
  }
};
