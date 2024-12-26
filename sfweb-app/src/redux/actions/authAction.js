import { signIn } from "../../services/axios/AxiosAuthen";
import { fetchUserAction } from "./userAction";
import * as types from "../constants/authType"

export const signinAction =
  (formData,setToken) =>
  async(dispatch) => {
    try {
      const response = await signIn(formData);
      if (!response.isError) {
        return dispatch(fetchUserAction(response.data.access_token)).then((res)=>{
          if(res.code==200){
            dispatch({
              type: types.SIGN_IN_SUCCESS,
              payload: response.data,
            });
            setToken(response.data.access_token);
            return res;
          }
          else
            return res;
        }, (error)=>{return error});
      } else {
        dispatch({
            type: types.SIGN_IN_FAIL,
        });
        return {code: 404, message: response.message};
      }
    } catch (error) {
      dispatch({
        type: types.SIGN_IN_FAIL,
      });
      return {code: 500, message: "There was an error while signing in! " + error.toString()};
    }
};

export const logoutAction = () => {
  return {
    type: types.LOG_OUT
  }
}

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

export const getNewTokenAction = (data) => {
  return{
    type: types.REFRESH_TOKEN_SUCCESS,
    payload: data
  }
}
