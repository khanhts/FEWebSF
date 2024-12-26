import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import { authReducer } from "./authReducer";
import { adminReducer } from "./adminReducer";
import { issueReducer } from "./issueReducer";
import { accountReducer } from "./accountReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer,
    issue: issueReducer,
    currentAcc: accountReducer
})

export default rootReducer;