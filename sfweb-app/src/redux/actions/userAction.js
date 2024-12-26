import { fetchMe } from "../../services/axios/AxiosUser";
import { initIssueAction } from "./issueAction";

const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
const FETCH_USER_LOGIN_FAIL = 'FETCH_USER_LOGIN_FAIL';
const SEARCH_USER = 'SEARCH_USER';



const fetchUserAction = (token) => async(dispatch) =>{
    try {
        const response = await fetchMe(token);
        if (response&&response.code>=200&&response.code<=300&&response.data.accounts[0].role_id!=1) {
          dispatch({
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: response.data,
          });
          dispatch(initIssueAction(token));
          return {code: 200, message: "Success!"};
        }
        else if(response.data.accounts[0].role_id==1)
        {
          dispatch({
            type: FETCH_USER_LOGIN_FAIL,
          });
          return {code: 404, message: "User not exist"};
        }
        else{
          dispatch({
              type: FETCH_USER_LOGIN_FAIL,
            });
            return {code: response.code, message: response.message};
        }
      } catch (error) {
        console.log("Error! ", error);  
        dispatch({
          type: FETCH_USER_LOGIN_FAIL,
        });
        return {code: 404, message: "There was an error while getting user data"};
      }
}


export {fetchUserAction, FETCH_USER_LOGIN_SUCCESS, FETCH_USER_LOGIN_FAIL};