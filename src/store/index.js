import axios from "axios";
const GET_LIST = "INDEX/GET_LIST";

const changeList = list => ({
  type: GET_LIST,
  list
});

export const getIndexList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios
      .get("http://localhost:9003/api/course/list", {
        validateStatus: function(status) {
          return status < 400;
        }
      })
      .then(res => {
        const { list } = res.data;
        dispatch(changeList(list));
      });
  };
};

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.list
      };
    default:
      return state;
  }
};
