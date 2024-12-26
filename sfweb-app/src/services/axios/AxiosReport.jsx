import { admin_api, api } from "../../redux/api/api"

export const fetchYourReport = async(postId, accountId) => {
    try {
        const response = await api.get(`/report-post/your-report?post_id=${postId}&account_id=${accountId}`)
        if(response&&response.data.code>=200&&response.data.code<=300)
            return {isError: false, data: response.data.data};
        return {isError: true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()};
    }
}

export const submitReport = async(formData) => {
    try {
        const response = await api.post('/report-post',formData)
        if(response&&response.data.code>=200&&response.data.code<=300)
            return {isError: false, data: response.data.data};
        return {isError: true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()};
    }
}

export const fetchAllReports = async(accountId, page = 1, pageSize = 5) => {
    try {
        const response = await admin_api.get(`/report?account_id=${accountId}&page=${page}&page_size=${pageSize}`);
        if(response&&response.data.code>=200&&response.data.code<=300)
            return {isError: false, data: response.data.data};
        return {isError:true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()}
    }
}