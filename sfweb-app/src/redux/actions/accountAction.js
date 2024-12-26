import * as types from '../constants/accountType'

export const accountSignInAction = (data) => {
    return {type: types.ACCOUNT_SIGNIN_SUCCESS, payload: data};
}

export const accountSignOutAction = () => {
    return {type: types.ACCOUNT_SIGN_OUT};
}