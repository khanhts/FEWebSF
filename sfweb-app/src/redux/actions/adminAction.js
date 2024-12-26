import { adminSignIn } from "../../services/axios/AxiosAdmin";
import { signIn } from "../../services/axios/AxiosAuthen";
import { fetchMe } from "../../services/axios/AxiosUser";
import * as types from "../constants/adminType"

export const signInAction = (formData, setTokenADM, navigate) => async (dispatch) => {
  try {
      const response = await adminSignIn(formData);
      if(response.code==200)
      {
        dispatch(getAdminAction(response.data.access_token)).then((res)=>{
          if(!res.isError){
            const data = {
              access_token: response.data.access_token,
              refresh_token: response.data.refresh_token,
              id: res.data.id,
              fullname: res.data.fullname,
              avatar: res.data.avatar,
              background: res.data.background,
              role: res.data.role
            }
            dispatch({
              type: types.ADMIN_SIGN_IN_SUCCESS,
              payload: data
            });
            navigate("/admin")
          }
            else
              res
        })
        setTokenADM(response.data.access_token);
        return {isError: false, message: "Sign in success!"};
      } 
      else
        return {isError: true, message: "Email or password is incorrect!"};
  } catch (error) {
    console.log("Error!", error);
    
    dispatch({
      type: types.ADMIN_SIGN_IN_FAIL, 
    });
    return {isError: true, message: "There was an error while signing in!"};
  }
};

export const getAdminAction = (token) => async(dispatch) => {
  try {
    const response = await fetchMe(token);
    if(response&&response.code>=200&&response.code<=300&&response.data.accounts[0].role_id==1){
      const accountRoot = { id: response.data.accounts[0].id,
                            fullname: response.data.accounts[0].fullname,
                            avatar: response.data.accounts[0].url_avatar,
                            background: response.data.accounts[0].url_background_profile,
                            role: "ADMIN"}
      return {isError: false, message: "Success!", data: accountRoot};
    }
    return {isError: true, message: "Access denied!"};
  } catch (error) {
    return {isError: true, message: "There was an error while signing in!"};
  }
}

export const logOutAction = () => {
  return {
    type: types.ADMIN_LOG_OUT
  };
}

export const setAdminATokenAction = (accessToken) => {
  return{
    type: types.SET_ADMIN_ACCESSTOKEN,
    payload: accessToken
  }
}

export const setAdminRTokenAction = (refreshToken) => {
  return{
    type: types.SET_ADMIN_REFRESHTOKEN,
    payload: refreshToken
  }
}
