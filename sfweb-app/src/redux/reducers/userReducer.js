import { FETCH_USER_LOGIN_SUCCESS, GET_ME, USER_LOGOUT } from "../actions/userAction";



const INITIAL_STATE = {
  account: {
    accessToken: "",
    refreshToken: "",
    userId: 0,
    fullname: '',
    avatar: ''
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
          console.log("Action: ", action);
          return {
            ...state, account:{
                accessToken: action.payload.data.access_token,
                refreshToken: action.payload.data.refresh_token,
                userId: action.payload.data.userID,
                fullname: action.payload.data.userFullname,
                avatar: action.payload.data.userAvatar
            },
            isAuthenticated: true,
          }
        case USER_LOGOUT:
          return{
            ...INITIAL_STATE,
          }
        default:
          return state
      }
}
export default userReducer;