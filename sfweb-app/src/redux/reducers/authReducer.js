import * as types from "../constants/authType"

const INITIAL_STATE = {
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SIGN_IN_SUCCESS:
          return {
            ...state, 
            accessToken: action.payload.data.access_token,
            refreshToken: action.payload.data.refresh_token,
            isLoggedIn: true
          }
        case types.SIGN_IN_FAIL:
          return {
            INITIAL_STATE
          }
        case types.LOG_OUT:
          return{
            INITIAL_STATE,
          }
        case types.SET_ACCESS_TOKEN:
            return{
                ...state,
                accessToken: payload? payload : null,
            }
        default:
          return state
      }
}