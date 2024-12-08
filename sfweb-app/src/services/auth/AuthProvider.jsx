import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { api } from "../../redux/api/api";
import { fetchMe } from "../axios/AxiosUser";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTokenAction } from "../../redux/actions/authAction";

class User{
    constructor(){
        this.id=0;
        this.fullname="";
        this.avatar="";
    }
}

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return authContext;
};

export const AuthProvider = ({children}) =>{
    const auth = useSelector((state)=>state.auth);
    const dispatch = useDispatch();  

    const [token, setToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [authUser, setAuthUser] = useState(new User());
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useLayoutEffect(()=>{
        if(isLoggedIn){
        console.log("Assigning header");
        
        const authInterceptor = api.interceptors.request.use((config)=>{
            console.log("Token: ", token)
            console.log("Retry: ", config._retry)
            config.headers.Authorization = 
                !config._retry && token? `Bearer ${token}`
                                        : config.headers.Authorization;
            return config;
        });
        return () => {
            console.log("Finish header");
            api.interceptors.request.eject(authInterceptor);
        };
        }
    }, [token]);

    useLayoutEffect(()=>{
        if(isLoggedIn){
            console.log("Getting new token");
            const refreshInterceptor = api.interceptors.response.use((response)=> response,
                async(error)=>{
                    const originalRequest = error.config;
                    console.log(originalRequest);
                    if(error.response.data.code==40101 && error.response.data.message === 'Unauthorize'){
                        try {
                            const response = await api.post('/users/refresh',{request_token: requestToken});
                            setToken(response.data.access_token);
                            dispatch(setAccessTokenAction(response.data.access_token))
                            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                            originalRequest._retry = true;
                            return api(originalRequest);
                        } catch (error) {
                            setToken(null);
                            dispatch(setAccessTokenAction(null))
                        }
                    }
                    return Promise.reject(error);
                },
            );

            return () => {
                api.interceptors.response.eject(refreshInterceptor);
            }
        }
    },[])


    const value = {
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};