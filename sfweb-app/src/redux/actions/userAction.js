import { fetchMe } from "../../services/axios/AxiosUser";
import { LOG_OUT } from "../constants/authType";

const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
const FETCH_USER_LOGIN_FAIL = 'FETCH_USER_LOGIN_FAIL';
const SEARCH_USER = 'SEARCH_USER';



const fetchUserAction = (token, navigate) => async(dispatch) =>{
    try {
        const response = await fetchMe(token);
        if (response&&response.code>=200&&response.code<=300) {
            dispatch({
                type: FETCH_USER_LOGIN_SUCCESS,
                payload: response.data,
              });
            navigate("/");
        }
        else{
            dispatch({
                type: FETCH_USER_LOGIN_FAIL,
              });
        }
      } catch (error) {
        console.log("Error! ", error);  
        dispatch({
          type: FETCH_USER_LOGIN_FAIL,
        });
      }
}
const userLogout = () => {
    return {
      type: LOG_OUT
    };
  };


export {fetchUserAction, FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGIN_FAIL,userLogout};