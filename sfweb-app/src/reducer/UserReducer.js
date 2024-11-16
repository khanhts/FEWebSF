import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT} from "../action/useAction";


const INITIAL_STATE = {
  account: {
    accessToken: "",
    username: "",
    avatar: "",
    userId: 0,
    background: "",
    roleId:0  ,  
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log("Action: ", action);
          return {
            ...state, account:{
                accessToken: action.payload.accessToken,
                userId: action.payload.data.user_id,
                username: action.payload.data.fullname,
                avatar: action.payload.data.url_avatar,
                background: action.payload.data.url_background_profile,
                roleId: action.payload.data.role_id,
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