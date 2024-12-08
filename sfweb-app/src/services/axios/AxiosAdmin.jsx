import { api } from "../../redux/api/api"
import { signIn } from "./AxiosAuthen"
import { fetchMe } from "./AxiosUser";

export const adminSignIn = async(formData) => {
    try{
        const response = await signIn(formData);
        if(response.data.code>=200&&response.data.code<=300){
            const checkUser = await fetchMe(response.data.data.access_token)
            if(checkUser&&checkUser.code>=200&&checkUser.code<=300&&checkUser.data.accounts[0].role_id==1)
                return {code: 200,
                        
                        data:
                        {access_token: response.data.data.access_token,
                        refresh_token: response.data.data.refresh_token,
                        id: checkUser.data.accounts[0].id,
                        fullname: checkUser.data.accounts[0].fullname,
                        avatar: checkUser.data.accounts[0].url_avatar,
                        background: checkUser.data.accounts[0].url_background_profile,
                        role: "ADMIN"}}
        }
        return {code: 400};
    }catch(error){
        return {code: 400};
    }
    
}