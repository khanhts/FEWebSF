import { api } from "../../redux/api/api";

export const fetchPost = async (accId, page, pageSize) => {
    try {
      const response = await api.get(`/posts?account_id=${accId}&page=${page}&page_size=${pageSize}`)
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
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },}
        )
      } catch (error) {
        console.log(error);
      }
}

  