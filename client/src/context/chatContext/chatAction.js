import axios from "../../utils/httpRequest";
import { CHAT_START, CHAT_SUCCESS, CHAT_FAILED } from "./chatConstant";

export const registerUser = async (dispatch, search) => {
  try {
    dispatch({ type: CHAT_START });

    const { data } = await axios.get("/chat/", JSON.stringify(user));

    dispatch({
      type: CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_FAILED,
      payload: error.response.data.message,
    });
  }
};
