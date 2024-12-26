import { api } from "../../redux/api/api";

//DONE

export const fetchFollowers = async(status,from_id,page,page_size) => {
    try{
        const response = await api.get(`/follower?status=${status}&from_id=${from_id}&page=${page}&page_size=${page_size}`)
        return response.data;
    }catch(error){
        throw new Error("There was an error fetching follow status: " + error.message);
    }
}

export const fetchFollowStatus = async(from_id,to_id) => {
    try{
        const response = await api.get(`/follower/status?from_id=${from_id}&to_id=${to_id}`)
        return response.data;
    }catch(error){
        throw new Error("There was an error fetching follow status: " + error.message);
    }
}

export const createFollow = async(from_id,to_id) => {
    try {
        const response = await api.post(`/follower`,{
            from_id: from_id,
            to_id: to_id
        })
        return response.data
    } catch (error) {
    console.log(error);
    }
}

export const updateFollowStatus = async(from_id,to_id) => {
    try {
        const response = await api.put(`/follower`,{
               from_follow: from_id,
                to_follow: to_id 
        })
        return response.data;
    } catch (error) {
    console.log(error);
    }
}

export const deleteFollowStatus = async(from_id,to_id) => {
    try {
        const response = await api.delete(`/follower`,{
        data:{
            from_follow: from_id,
            to_follow: to_id
        }
    })
        return response.data;
    } catch (error) {
    console.log(error);
    }
}