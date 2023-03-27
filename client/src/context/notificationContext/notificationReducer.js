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

export const createNotificationReducer = (state, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION_START:
      return {
        loading: true,
      };
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isSent: true,
        notification: action.payload,
      };
    case CREATE_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        isSent: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
export const getNotificationReducer = (state, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_START:
      return {
        loading: true,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notification: action.payload,
      };
    case GET_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteNotificationReducer = (state, action) => {
  switch (action.type) {
    case DELETE_NOTIFICATION_START:
      return {
        loading: true,
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
      };
    case DELETE_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        isDeleted:false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
