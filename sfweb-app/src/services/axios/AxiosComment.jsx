import { api } from "../../redux/api/api";

export const fetchComments = async(postId, page, size, token) => {
    try {
        const response = await api.get(`/comments?post_id=${postId}&page=${page}&page_size=${size}`,
                                        {
                                            headers: {
                                                "Authorization": `Bearer ${token}`
                                            }
                                        })
        return response
    } catch (error) {
        console.log(error);
    }
}
