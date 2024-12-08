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

export const createComment = async( postId, description, accountId, file, token) => {
    const formData = new FormData();
    formData.append("post_id", postId);
    formData.append("account_id", accountId);
    formData.append("description", description);
    if(file!=null)
        formData.append("image",file[0])
    try {
        const response = await api.post(`/comments`,formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },});
        return response
    } catch (error) {
    console.log(error);
    }
}

export const updateComment = async(id, description, file, token) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("description", description);
    if(file!=null)
        formData.append("image",file[0])
    try {
        const response = await api.put(`/comments`,formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },});
        return response
    } catch (error) {
    console.log(error);
    }
}

export const deleteComment = async(commentId, token) => {
    try {
        const response = await api.delete(`/comments/${commentId}`, 
            { headers: {Authorization: `Bearer ${token}`}}
            )
        return response;
      } catch (error) {
        console.log(error);
      }
  }


