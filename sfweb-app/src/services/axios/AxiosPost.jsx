import { api } from "../../redux/api/api";

export const fetchPost = async (accId, page, pageSize) => {
    try {
      const response = await api.get(`/posts?account_id=${accId}&page=${page}&page_size=${pageSize}`,{})
      return response
    } catch (error) {
      console.log(error);
    }
}


export const createPost = async(accId, content, lng, lat, files, token) => {
    const formData = new FormData();
    formData.append("account_id", accId);
    formData.append("description", content);
    if(lng!=null||lat!=null)    
    {formData.append("lng", lng);
    formData.append("lat", lat);}
    Array.from(files).forEach((file)=>{formData.append("images",file)})
    try {
        const response = await api.post(`/posts`,formData, {
            headers: {
              Authorization: token,
            },});
            return response;
      } catch (error) {
        console.log(error);
      }
}

export const editPost = async(accId, postId, content, files, token) => {
  const formData = new FormData();
  formData.append("account_id", accId);
  formData.append("description", content);
  Array.from(files).forEach((file)=>{formData.append("images",file)})
  try {
      const response = await api.put(`/posts/${postId}`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },})
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const deleteImage = async(imgId, token) => {
  try {
      const response = await api.delete(`/posts/images/${imgId}`, 
          { headers: {Authorization: `Bearer ${token}`}}
          )
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const deletePost = async(postId, token) => {
  try {
      const response = await api.post(`/posts/soft-delete/${postId}`,{},
        {headers:{
          Authorization: `Bearer ${token}`
        }}
          )
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
}

export const fetchProfilePosts = async(from_id, to_id, page, pageSize, token) => {
  try {
    const response = await api.get(`/posts/person?from_id=${from_id}&to_id=${to_id}&page=${page}&page_size=${pageSize}`,{
      headers:{
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    console.log("Can't fetch this user's posts!");
  }
}
  