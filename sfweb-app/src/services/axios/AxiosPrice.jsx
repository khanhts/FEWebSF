import { admin_api, api } from "../../redux/api/api";

export const fetchAllPrice = async(page=1) => {
    try{
        const response = await admin_api.get(`/price?page=${page}&page_size=5`)
        console.log("Fetch price response: ", response);
        
        return response.data
    }catch(error){
        console.log("Error! ",error);
    }
}

export const fetchUpgradePlans = async() => {
    try{
        const response = await api.get("/accounts/upgrade-price")
        console.log("Fetch upgrade plans: ", response);
        
        return response.data
    }catch(error){
        console.log("Error! ",error);
    }
}

export const createPriceTag = async(formData) => {
    try{
        const response = await admin_api.post("/price",formData)
        console.log("Create price response: ", response);
        
        return 0;
    }catch(error){
        console.log("Error! ",error);
        return 1;
    }
}
