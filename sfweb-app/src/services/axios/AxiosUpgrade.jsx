import { admin_api, api } from "../../redux/api/api"

export const fetchAllUpgradeRequests = async(page=1) => {
    try{
        const response = await admin_api.get(`/upgrade-queue?page=${page}&page_size=5`);
        console.log("Fetch requests reponse: ", response)
        return response.data;
    }catch(error){
        console.log("Error! ", error)
    }
}

export const createUpgradeRequest = async(account_id) => {
    try{
        const response = await api.post("/accounts/upgrade",{
            account_id: account_id
        });
        console.log("Upgrade result: ", response);
        return response.data;
    }catch(error){
        console.log("Error! ",error);
    }
}

export const acceptUpgradeRequest = async(id) => {
    try {
        const response = await admin_api.post(`upgrade-queue/${id}`);
        if(response&&response.data.code>=200&response.data.code<=300)
            return {isError: false};
        return {isError: true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()};
    }
}

export const rejectUpgradeRequest = async(id) => {
    try {
        const response = await admin_api.delete(`upgrade-queue/${id}`);
        if(response&&response.data.code>=200&response.data.code<=300)
            return {isError: false};
        return {isError: true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()};
    }
}