import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL
} from "../Constants/UserConstants";

export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const res = await axios.post(
      "http://localhost:4000/api/v1/user/register",
      user,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    console.log(userData);

    const res = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getLoggedUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const res = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const res = await axios.post(
      "http://localhost:4000/api/v1/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: LOGOUT_SUCCESS, payload: res.data.message });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const res = await axios.put(
      "http://localhost:4000/api/v1/user/me/update",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const updateUserPassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const res = await axios.put(
      "http://localhost:4000/api/v1/user/password/updatePassword",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS});
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const forgotUserPassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const res = await axios.post(
      "http://localhost:4000/api/v1/user/password/forgot",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS,payload:res.data.message});
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

