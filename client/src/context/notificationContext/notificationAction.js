import axios from "../../utils/httpRequest";
import {
  CREATE_NOTIFICATION_FAILED,
  CREATE_NOTIFICATION_START,
  CREATE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILED,
  GET_NOTIFICATION_START,
  GET_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILED,
  RESET,
} from "./notificationConstant";

export const createNotification = async (dispatch, messageId) => {
  try {
    dispatch({ type: CREATE_NOTIFICATION_START });

    const { data } = await axios.post(
      "/notifications/",
      JSON.stringify({ messageId })
    );

    dispatch({
      type: CREATE_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTIFICATION_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const getNotification = async (dispatch) => {
  try {
    dispatch({ type: GET_NOTIFICATION_START });

    const { data } = await axios.get("/notifications/");

    dispatch({
      type: GET_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATION_FAILED,
      payload: error.response.data.message,
    });
  }
};

export const deleteNotificationAction = async (dispatch, chatId) => {
  try {
    dispatch({ type: DELETE_NOTIFICATION_START });

    const { data } = await axios.delete(`/notifications/bychatid/${chatId}`);

    dispatch({
      type: DELETE_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTIFICATION_FAILED,
      payload: error.response.data.message,
    });
  }
};
// export const deleteNotificationAction = async (dispatch, id) => {
//   try {
//     dispatch({ type: DELETE_NOTIFICATION_START });

//     const { data } = await axios.delete(`/notifications/${id}`);

//     dispatch({
//       type: DELETE_NOTIFICATION_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_NOTIFICATION_FAILED,
//       payload: error.response.data.message,
//     });
//   }
// };
