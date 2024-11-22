import { IS_SEARCH } from "../actions/searchAction";

const INITIAL_STATE = {
    id: '',
    fullname: '',
    avatar: ''
}


const searchReducer = (state = INITIAL_STATE, action) =>{
switch(action.type){
    case IS_SEARCH:  
    {
        console.log("action: ", action);
        const userList = action.payload.result.map((user) => (
            {
                id: user.user_id,
                fullname: user.fullname,
                avatar: user.url_avatar
            }
        ));
        return userList;
    }
    default: return state;
}
}

export default searchReducer