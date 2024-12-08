import { admin_api, api } from "../../redux/api/api"

export const fetchAllUpgradeRequests = async(token, page=1) => {
    try{
        const response = await admin_api.get(`/upgrade-queue?page=${page}&page_size=5`, {
            headers:{
                Authorization: token
            }
        });
        console.log("Fetch requests reponse: ", response)
        return response.data;
    }catch(error){
        console.log("Error! ", error)
    }
}

export const createUpgradeRequest = async(account_id,token) => {
    try{
        const response = await api.post("/accounts/upgrade",{
            account_id: account_id
        },{
            headers:{
                Authorization: token
            }
        });
        console.log("Upgrade result: ", response);
        return response.data;
    }catch(error){
        console.log("Error! ",error);
    }
}