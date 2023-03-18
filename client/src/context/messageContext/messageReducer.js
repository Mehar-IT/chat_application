import {
  CREATE_MESSAGE_FAILED,
  CREATE_MESSAGE_START,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILED,
  GET_MESSAGE_START,
  GET_MESSAGE_SUCCESS,
  RESET,
} from "./messageContext";

export const createMessageReducer = (state, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_START:
      return {
        loading: true,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        message: null,
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

export const getMessageReducer = (state, action) => {
  switch (action.type) {
    case GET_MESSAGE_START:
      return {
        loading: true,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case GET_MESSAGE_FAILED:
      return {
        ...state,
        loading: false,
        message: null,
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
