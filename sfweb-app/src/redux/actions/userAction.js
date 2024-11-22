const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
const SEARCH_USER = 'SEARCH_USER';
const USER_LOGOUT = 'USER_LOGOUT';
const GET_ME = 'GET_ME';    

const doLogin = (data) =>{
    return{
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}
const userLogout = () => {
    return {
      type: USER_LOGOUT
    };
  };

const getMe = (data) =>{
    return{
        type: GET_ME,
        payload: data
    }
}


export {doLogin, FETCH_USER_LOGIN_SUCCESS, GET_ME, getMe, userLogout, USER_LOGOUT};