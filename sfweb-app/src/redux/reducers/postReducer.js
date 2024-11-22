import { FETCH_USER_LOGIN_SUCCESS } from "../actions/userAction";

const INITIAL_STATE = {
    post:[{
        postId: '',
        username: '',
        avatar: '',
    }],
};
const userReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log("Action: ", action);
          return {
            ...state, post:{
              
            },
          }
        default:
          return state
      }
}
export default userReducer;