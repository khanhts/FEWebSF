import { api } from '../api/api'
import * as types from '../constants/issueType'

export const initIssueAction = (token) => async(dispatch) => {
    try {
        const response = await api.get('/report-post/issue',{
            headers:{
                Authorization: token
        }})
        if(response&&response.data.code>=200&&response.data.code<=300)
            dispatch({type: types.INITIALIZE_ISSUES_SUCCESS, payload: response.data.data});
        else
            dispatch({type: types.INITIALIZE_ISSUES_FAIL});
    } catch (error) {
        dispatch({type: types.INITIALIZE_ISSUES_FAIL});
    }
}