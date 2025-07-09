import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "../Constants/UserConstants";

export const UserLoginReducer = (
  state = { user: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,

        isAuthenticated: false,
        loading: true,
        error: null,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,

        isAuthenticated: true,
      };

    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        isAuthenticated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const UserRegisterReducer = (
  state = { loading: false, user: {}, isAuthenticated: false, error: null },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case USER_REGISTER_SUCCESS:
      return {
        user: action.payload.user,
        loading: false,
        isAuthenticated: true,
      };

    case USER_REGISTER_FAIL:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };

    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export const loadUserReducer = (
  state = { currentLoginUser: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        currentLoginUser: action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const logOutUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        loading: true,
      };

    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        message: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        error: action.payload,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export const updateUserReducer = (
  state = { updatedUser: null, loading: false, error: null, isUpdated: false },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    default:
      return state;
  }
};

export const forgotUserPasswordReducer = (
  state = { isUpdated: false, error: null, loading: false ,message:""},
  action
) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        message:action.payload
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
