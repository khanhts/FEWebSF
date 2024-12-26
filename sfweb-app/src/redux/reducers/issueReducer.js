import { LOG_OUT } from '../constants/authType';
import * as types from '../constants/issueType'

const INITIAL_STATE = {
    context: [{}],
    isInitError: false
}

export const issueReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case types.INITIALIZE_ISSUES_SUCCESS:
            return {
                ...state,
                context: action.payload,
                isInitError: false
            }
        case types.INITIALIZE_ISSUES_FAIL:
            return{
                ...state,
                isInitError: true
            }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}
