import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import './rootlayout.css'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { fetchUserAction } from '../../../redux/actions/userAction';


const RootLayout = () => {
    const auth = useSelector((state)=>state.auth);

    return auth.accessToken!=null?(
        <div className="root-layout">
            <Navbar/>
            <Outlet/>    
        </div>
    ):(
        <Navigate to="/registration"/>
    );
}

export default RootLayout