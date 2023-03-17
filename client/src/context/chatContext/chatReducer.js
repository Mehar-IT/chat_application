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
  ADD_GROUP_START,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
  REMOVE_GROUP_START,
  REMOVE_GROUP_SUCCESS,
  REMOVE_GROUP_FAILED,
  RESET,
} from "./chatConstant";

export const createChatReducer = (state, action) => {
  switch (action.type) {
    case CREATE_CHAT_START:
      return {
        loading: true,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chat: action.payload,
      };
    case CREATE_CHAT_FAILED:
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

export const getChatReducer = (state, action) => {
  switch (action.type) {
    case GET_CHAT_START:
      return {
        loading: true,
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };
    case GET_CHAT_FAILED:
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

export const crateGroupReducer = (state, action) => {
  switch (action.type) {
    case CREATE_GROUP_START:
      return {
        loading: true,
      };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
        groupCreated: true,
      };
    case CREATE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        groupCreated: false,
        error: null,
      };
    default:
      return state;
  }
};

export const renameGroupReducer = (state, action) => {
  switch (action.type) {
    case RENAME_GROUP_START:
      return {
        loading: true,
      };
    case RENAME_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isRenamed: true,
        group: action.payload,
      };
    case RENAME_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        group: null,
        isRenamed: false,
        error: null,
      };
    default:
      return state;
  }
};

export const addGroupReducer = (state, action) => {
  switch (action.type) {
    case ADD_GROUP_START:
      return {
        loading: true,
      };
    case ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        group: action.payload,
      };
    case ADD_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        group: null,
        isAdded: false,
        error: null,
      };
    default:
      return state;
  }
};

export const removeGroupReducer = (state, action) => {
  switch (action.type) {
    case REMOVE_GROUP_START:
      return {
        loading: true,
      };
    case REMOVE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved: true,
        group: action.payload,
      };
    case REMOVE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET:
      return {
        ...state,
        loading: false,
        group: null,
        isRemoved: false,
        error: null,
      };
    default:
      return state;
  }
};
