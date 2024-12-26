import { signIn } from "./AxiosAuthen"
import { fetchMe } from "./AxiosUser";

export const adminSignIn = async(formData) => {
    try{
        const response = await signIn(formData);
        if(!response.isError)
            return {code:200, data: response.data};
        return {code: 404};
    }catch(error){
        return {code: 404};
    }
    
}