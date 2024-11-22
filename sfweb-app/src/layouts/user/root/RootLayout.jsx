import { Outlet, redirect, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import './rootlayout.css'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchMe } from '../../../services/axios/AxiosUser';
import { getMe } from '../../../redux/actions/userAction';

const RootLayout = () => {
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    const token = useSelector((state)=>state.user.account.accessToken);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated)
            navigate("/registration");
    },[])

    return (
        <div className="root-layout">
            {isAuthenticated? <Navbar/>: <></>}
            <Outlet/>    
        </div>
    );
}

export default RootLayout