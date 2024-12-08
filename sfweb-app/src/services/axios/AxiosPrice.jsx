import { admin_api, api } from "../../redux/api/api";

export const fetchAllPrice = async(token,page=1) => {
    try{
        const response = await admin_api.get(`/price?page=${page}&page_size=5`,{
            headers:{
                Authorization: token
            }
        })
        console.log("Fetch price response: ", response);
        
        return response.data
    }catch(error){
        console.log("Error! ",error);
    }
}

export const fetchUpgradePlans = async(token) => {
    try{
        const response = await api.get("/accounts/upgrade-price",{
            headers:{
                Authorization: token
            }
        })
        console.log("Fetch upgrade plans: ", response);
        
        return response.data
    }catch(error){
        console.log("Error! ",error);
    }
}

export const createPriceTag = async(formData,token) => {
    try{
        const response = await admin_api.post("/price",formData,{
            headers:{
                Authorization: token
            }
        })
        console.log("Create price response: ", response);
        
        return 0;
    }catch(error){
        console.log("Error! ",error);
        return 1;
    }
}
