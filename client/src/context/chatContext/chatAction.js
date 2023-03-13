import axios from "../../utils/httpRequest";
import {
  CREATE_CHAT_START,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILED,
  GET_CHAT_FAILED,
  GET_CHAT_START,
  GET_CHAT_SUCCESS,
} from "./chatConstant";

export const createUserChat = async (dispatch, userId) => {
  try {
    dispatch({ type: CREATE_CHAT_START });

    const { data } = await axios.post("/chats/", JSON.stringify({ userId }));

    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CHAT_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getUserChat = async (dispatch) => {
  try {
    dispatch({ type: GET_CHAT_START });

    const { data } = await axios.get("/chats/");

    dispatch({
      type: GET_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_FAILED,
      payload: error.response.data.message,
    });
  }
};
