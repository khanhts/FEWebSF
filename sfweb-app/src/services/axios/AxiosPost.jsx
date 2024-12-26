import { api } from "../../redux/api/api";

//DONE

export const fetchPost = async (accId, page, pageSize) => {
    try {
      const response = await api.get(`/posts?account_id=${accId}&page=${page}&page_size=${pageSize}`,{})
      return response
    } catch (error) {
      console.log(error);
    }
}


export const createPost = async(accId, content, lng, lat, files) => {
    const formData = new FormData();
    formData.append("account_id", accId);
    formData.append("description", content);
    if(lng!=null||lat!=null)    
    {formData.append("lng", lng);
    formData.append("lat", lat);}
    Array.from(files).forEach((file)=>{formData.append("images",file)})
    try {
        const response = await api.post(`/posts`,formData);
            return response;
      } catch (error) {
        console.log(error);
      }
}

export const editPost = async(accId, postId, content, files) => {
  const formData = new FormData();
  formData.append("account_id", accId);
  formData.append("description", content);
  Array.from(files).forEach((file)=>{formData.append("images",file)})
  try {
      const response = await api.put(`/posts/${postId}`,formData)
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const deleteImage = async(imgId) => {
  try {
      const response = await api.delete(`/posts/images/${imgId}`)
      return response.data;
    } catch (error) {
      console.log(error);
    }
}

export const deletePost = async(postId) => {
  try {
      const response = await api.post(`/posts/soft-delete/${postId}`)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
}

export const fetchProfilePosts = async(from_id, to_id, page, pageSize) => {
  try {
    const response = await api.get(`/posts/person?from_id=${from_id}&to_id=${to_id}&page=${page}&page_size=${pageSize}`);
    return response;
  } catch (error) {
    console.log("Can't fetch this user's posts!");
  }
}
  