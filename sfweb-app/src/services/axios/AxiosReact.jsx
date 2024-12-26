import { api } from "../../redux/api/api";

//DONE

export const createReact = async (account_id, post_id, state) => {
    try {
        const response = await api.post(`/react`, {
            account_id: account_id,
            post_id: post_id,
            state: state,
        });
        return response;
    } catch (error) {
        throw new Error("An error occures when trying to create your react: " + error.message);
    }
}

export const deleteReact = async (account_id, post_id) => {
    try {
        const response = await api.delete(`/react`,{
            data:{
                account_id: account_id,
                post_id: post_id
            }
        });
        return response;
    } catch (error) {
        throw new Error("An error occures when trying to remove your react: " + error.message);
    }
}

export const updateReact = async (account_id, post_id, state) => {
    try {
        const response = await api.put(`/react`, {
            account_id: account_id,
            post_id: post_id,
            state: state,
        });
        return response;
    } catch (error) {
        throw new Error("An error occures when trying to update your react: " + error.message);
    }
}