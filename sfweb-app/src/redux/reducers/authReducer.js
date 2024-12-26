import * as types from "../constants/authType"

const INITIAL_STATE = {
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:{
          return {
            ...state, 
            accessToken: action.payload.access_token,
            refreshToken: action.payload.refresh_token,
            isLoggedIn: true
          }}
        case types.SIGN_IN_FAIL:
          return INITIAL_STATE
        case types.LOG_OUT:
          return INITIAL_STATE
        case types.SET_ACCESS_TOKEN:{
          console.log("Action: ", action);
          
          return{
              ...state,
              accessToken: action.payload.access_token
          }}
        default:
          return state
      }
}