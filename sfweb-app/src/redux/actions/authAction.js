import { signIn } from "../../services/axios/AxiosAuthen";
import { fetchUserAction } from "./userAction";
import * as types from "../constants/authType"

export const signinAction =
  (formData, navigate) =>
  async (dispatch) => {
    try {
      const response = await signIn(formData);
      if (response && response.data.code>=200 && response.data.code<=300) {
        dispatch({
          type: types.SIGN_IN_SUCCESS,
          payload: response.data,
        });
        dispatch(fetchUserAction(response.data.data.access_token, navigate));
      } else {
        dispatch({
            type: types.SIGN_IN_FAIL,
        });
      }
    } catch (error) {
        console.log("Sign in error! ", error);
        
      dispatch({
        type: types.SIGN_IN_FAIL,
      });
    }
};

export const setAccessTokenAction = (token) => {
    return{
        type: types.SET_ACCESS_TOKEN,
        payload: token
    };
}

export const setRefreshTokenAction = (token) => {
    return{
        type: types.SET_REFRESH_TOKEN,
        payload: token
    };
}
