import * as types from "../constants/adminType"

const INITIAL_STATE = {
    access_token: "",
    refresh_token: "",
    id: 0,
    fullname: "",
    avatar: "",
    background: "",
    role: ""
}

export const adminReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case types.ADMIN_SIGN_IN_SUCCESS:
            return{
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                id: action.payload.id,
                fullname: action.payload.fullname,
                avatar: action.payload.avatar,
                background: action.payload.background,
                role: action.payload.role
            };
        case types.ADMIN_LOG_OUT:
            return{
                INITIAL_STATE
            };
        default:
            return state
    }
}