import { adminSignIn } from "../../services/axios/AxiosAdmin";
import { fetchMe } from "../../services/axios/AxiosUser";
import * as types from "../constants/adminType"

export const signInAction = (formData) => async (dispatch) => {
  try {
      const response = await adminSignIn(formData);
      if(response.code==200 && response.data.role=="ADMIN")
      {
        dispatch({
            type: types.ADMIN_SIGN_IN_SUCCESS,
            payload: response.data
        });
        return {signInSuccess: true, message: "Sign in success!"}
      } 
      else
        return {signInSuccess: false, message: "Access denied!!"}
  } catch (error) {
    dispatch({
      type: types.ADMIN_SIGN_IN_FAIL, 
    });
    return {signInSuccess: false, message: "There was an error while signing in!"}
  }
};

export const logOutAction = () => {
  return {
    type: types.ADMIN_LOG_OUT
  };
}

