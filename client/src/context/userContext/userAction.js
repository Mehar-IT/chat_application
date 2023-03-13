import axios from "../../utils/httpRequest";
import {
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SEARCH_CHAT_START,
  SEARCH_CHAT_SUCCESS,
  SEARCH_CHAT_FAILED,
  RESET,
} from "./userConstant";

export const registerUser = async (dispatch, user) => {
  try {
    dispatch({ type: REGISTER_START });

    const { data } = await axios.post("/user/register", JSON.stringify(user));

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const loginUser = async (dispatch, user) => {
  try {
    dispatch({ type: LOGIN_START });

    const { data } = await axios.post("/user/login", JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await axios.get("/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    alert(error.response.data.message);
    dispatch({ type: LOGOUT_FAILED, payload: error.response.data.message });
  }
};

export const reset = async (dispatch) => {
  dispatch({ type: RESET });
};

export const searchChat = async (dispatch, search) => {
  try {
    dispatch({ type: SEARCH_CHAT_START });

    const { data } = await axios.get(`/user/allUsers?search=${search}`);

    dispatch({
      type: SEARCH_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_CHAT_FAILED,
      payload: error.response.data.message,
    });
  }
};
