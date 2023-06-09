import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
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

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_FAILED:
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
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

export const usersReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_CHAT_START:
      return {
        loading: true,
      };

    case SEARCH_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.user,
      };

    case SEARCH_CHAT_FAILED:
      return {
        ...state,
        loading: false,
        users: null,
        error: action.payload,
      };

    case RESET:
      return {
        ...state,
        users: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
