import * as types from '../constants/accountType'
import { LOG_OUT } from '../constants/authType'

const INITIAL_STATE = {
    data: {},
    isSignIn: false,
}

export const accountReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.ACCOUNT_SIGNIN_SUCCESS:
            return{
                ...state,
                data: action.payload,
                isSignIn: true
            }
        case types.ACCOUNT_SIGN_OUT:
            return{
                ...state,
                isSignIn: false
            }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}
