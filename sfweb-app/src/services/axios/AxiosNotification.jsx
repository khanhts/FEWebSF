import { api } from "../../redux/api/api"

//DONE

export const fetchMyNotifications = async(id, page=1, pageSize=5) => {
    try {
        const response = await api.get(`/notification/${id}?page=${page}&page_size=${pageSize}`);
        return response.data
    } catch (error) {
        console.log("Error! ", error);
    }
}

export const updateNotiSeenState = async(id) => {
    try {
        const response = await api.put(`/notification/${id}`)
        if(response&&response.data.code>=200&&response.data.code<=300)
            return {isError: false, message: response.data.message};
        return {isError: true, message: response.data.message};
    } catch (error) {
        return {isError: true, message: error.toString()};
    }
}