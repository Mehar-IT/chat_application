import axios from "../../utils/httpRequest";
import {
  CREATE_MESSAGE_FAILED,
  CREATE_MESSAGE_START,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_START,
  GET_MESSAGE_SUCCESS,
  RESET,
} from "./messageContext";

export const createMessage = async (dispatch, messageData) => {
  try {
    dispatch({ type: CREATE_MESSAGE_START });

    const { data } = await axios.post(
      "/messages/",
      JSON.stringify(messageData)
    );

    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({
      type: CREATE_MESSAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getAllMessage = async (dispatch, chatId) => {
  try {
    dispatch({ type: GET_MESSAGE_START });

    const { data } = await axios.get(`/messages/${chatId}`);

    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGE_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const reset = async (dispatch) => {
  dispatch({ type: RESET });
};
