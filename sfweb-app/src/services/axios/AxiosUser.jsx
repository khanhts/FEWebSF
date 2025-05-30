import { api } from "../../redux/api/api";

//DONE

export const fetchMe = async (token) => {
    try {
        const response = await api.get(`/accounts/me`,{
            headers:{
                Authorization: token,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("There was an error fetching your profile: " + error.message);
    }
}

export const fetchUser = async(id) => {
    try{
        const response = await api.get(`/accounts/${id}`)
        return response.data;
    }catch(error){
        throw new Error("There was an error fetching this user profile: " + error.message);
    }
}

export const searchUsers = async(searchChars, page, page_size)=>{
    try {
        const response = await api.get(`/accounts/searching?name=${searchChars}&page=${page}&page_size=${page_size}`)
        return response;
    } catch (error) {
        
    }
}