import axios from "../../utils/httpRequest";
import {
  CREATE_CHAT_START,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILED,
  GET_CHAT_FAILED,
  GET_CHAT_START,
  GET_CHAT_SUCCESS,
  CREATE_GROUP_START,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILED,
  RENAME_GROUP_START,
  RENAME_GROUP_SUCCESS,
  RENAME_GROUP_FAILED,
  RESET,
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

export const createGroupChat = async (dispatch, chatData) => {
  try {
    dispatch({ type: CREATE_GROUP_START });

    const { data } = await axios.post("/chats/group", chatData);

    dispatch({
      type: CREATE_GROUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_GROUP_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const renameGroupChat = async (dispatch, chatData) => {
  try {
    dispatch({ type: RENAME_GROUP_START });

    const { data } = await axios.put("/chats/rename", chatData);

    dispatch({
      type: RENAME_GROUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RENAME_GROUP_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const reset = async (dispatch) => {
  dispatch({ type: RESET });
};
