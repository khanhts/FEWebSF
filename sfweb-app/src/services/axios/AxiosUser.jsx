import { api } from "../../redux/api/api";

export const fetchMe = async (token) => {
    try {
        const response = await api.get(`/accounts/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("There was an error fetching your profile: " + error.message);
    }
}