import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { admin_api, api } from "../../redux/api/api";
import { fetchMe } from "../axios/AxiosUser";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewTokenAction, setAccessTokenAction, setRefreshTokenAction } from "../../redux/actions/authAction";
import axios from "axios";
import { setAdminATokenAction } from "../../redux/actions/adminAction";

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return authContext;
};

export const AuthProvider = ({children}) =>{
    const authRToken = useSelector((state)=>state.auth.refreshToken);
    const authAToken = useSelector((state)=>state.auth.accessToken);

    const adminAToken = useSelector((state)=>state.admin.access_token);
    const adminRToken = useSelector((state)=>state.admin.refresh_token);

    const dispatch = useDispatch();

    const [token, setToken] = useState(authAToken);
    const [tokenADM, setTokenADM] = useState(adminAToken);

    useLayoutEffect(()=>{
        const authInterceptor = api.interceptors.request.use((config)=>{
            config.headers.Authorization = 
                !config._retry && token
                ? `Bearer ${token}`
                : config.headers.Authorization;
            console.log(config);
            return config;
        });

        return ()=>{
            api.interceptors.request.eject(authInterceptor);
        }
    }, [token])

    useLayoutEffect(()=>{
        const adminInterceptor = admin_api.interceptors.request.use((config)=>{
            config.headers.Authorization = 
                !config._retry && tokenADM
                ? `Bearer ${tokenADM}`
                : config.headers.Authorization;
            return config;
        });

        return ()=>{
            admin_api.interceptors.request.eject(adminInterceptor);
        }
    }, [tokenADM])

    useLayoutEffect(()=>{
        const refreshInterceptor = api.interceptors.response.use(async(response)=> 
            {
                console.log("Response interceptor: ", response)
                if(response&&response.data.code==40101&&response.data.message==='Unauthorized'){
                    const bodyData = {refresh_token: authRToken};
                    
                    const originalRequest = response.config;
                    const res = await api.post('/users/refresh',bodyData);
                    if(res&&res.data.code>=200&&res.data.code<=300){
                        dispatch(setAccessTokenAction(res.data.data.access_token));
                        setToken(res.data.data.access_token)
                        originalRequest.headers.Authorization = `Bearer ${res.data.data.access_token}`;
                        originalRequest._retry = true;
                        return api(originalRequest);
                    }
                }
                return response
            } , async(error) => {
            }
        );

        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        }
    },[authRToken])

    useLayoutEffect(()=>{
        const refreshAdminInterceptor = admin_api.interceptors.response.use(async(response)=> 
            {
                console.log("Response interceptor: ", response)
                if(response&&response.data.code==40101&&response.data.message==='Unauthorized'){
                    const bodyData = {refresh_token: adminRToken};

                    const originalRequest = response.config;
                    const res = await api.post('/users/refresh',bodyData);
                    console.log("Get new accessToken response: ", res);
                    if(res&&res.data.code>=200&&res.data.code<=300){
                        dispatch(setAdminATokenAction(res.data.data.access_token));
                        setTokenADM(res.data.data.access_token);
                        originalRequest.headers.Authorization = `Bearer ${res.data.data.access_token}`;
                        originalRequest._retry = true;
                        return admin_api(originalRequest);
                    }
                }
                return response
            } , async(error) => {
            }
        );

        return () => {
            admin_api.interceptors.response.eject(refreshAdminInterceptor);
        }
    },[adminRToken])


    const value = {
        token,
        setToken,
        tokenADM,
        setTokenADM
    }

    return(
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
};