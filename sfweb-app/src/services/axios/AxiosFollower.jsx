import axios from "axios";
import { api } from "../../redux/api/api";

const testAPI = axios.create({
    baseURL: "http://foodioo.camenryder.xyz:80/api"
})

export const testFetchFollowers = async(token) => {
    try {
        const response = testAPI.get(`/follower?status=accept&from_id=1&page=1&page_size=10`,{
            headers:{
                Authorization: token
            }
        })
        return response
    } catch (error) {
        console.log("There was an error while testing this api")
    }

}

export const fetchFollowers = async(status,from_id,page,page_size, token) => {
    try{
        const response = await api.get(`/follower?status=${status}&from_id=${from_id}&page=${page}&page_size=${page_size}`,{
            headers:{
                Authorization: token
            }
        })
        return response.data;
    }catch(error){
        throw new Error("There was an error fetching follow status: " + error.message);
    }
}

export const fetchFollowStatus = async(from_id,to_id,token) => {
    try{
        const response = await api.get(`/follower/status?from_id=${from_id}&to_id=${to_id}`,{
            headers:{
                Authorization: token
            }
        })
        return response.data;
    }catch(error){
        throw new Error("There was an error fetching follow status: " + error.message);
    }
}

export const createFollow = async(from_id,to_id,token) => {
    try {
        const response = await api.post(`/follower`,{
            from_id: from_id,
            to_id: to_id
        },{
            headers:{
                Authorization: token
            }
        })
        return response.data
    } catch (error) {
    console.log(error);
    }
}

export const updateFollowStatus = async(from_id,to_id,token) => {
    try {
        const response = await api.put(`/follower`,{
               from_follow: from_id,
                to_follow: to_id 
        },{
            headers:{
                Authorization: token
            }
        })
        return response.data;
    } catch (error) {
    console.log(error);
    }
}

export const deleteFollowStatus = async(from_id,to_id,token) => {
    try {
        const response = await api.delete(`/follower`,{
        headers:{
            Authorization: token
        },
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