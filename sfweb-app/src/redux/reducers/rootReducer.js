import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import { authReducer } from "./authReducer";
import { adminReducer } from "./adminReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer
})

export default rootReducer;