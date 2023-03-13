import { CHAT_START, CHAT_SUCCESS, CHAT_FAILED } from "./userConstant";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_START:
      return {
        loading: true,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CHAT_FAILED:
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
