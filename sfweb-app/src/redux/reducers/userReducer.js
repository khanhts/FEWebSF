import { FETCH_USER_LOGIN_FAIL, FETCH_USER_LOGIN_SUCCESS, } from "../actions/userAction";
import { LOG_OUT } from "../constants/authType";



const INITIAL_STATE = {
  accounts: [],
  email: "",
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
          return {
            ...state, 
            accounts: action.payload.accounts,
            email: action.payload.email,
            isAuthenticated: true,
          }
        case FETCH_USER_LOGIN_FAIL:
          return {
            ...state, 
            accounts: [],
            email: "",
            isAuthenticated: false,
          }
        case LOG_OUT:
          return{
            INITIAL_STATE,
          }
        default:
          return state
      }
}
export default userReducer;