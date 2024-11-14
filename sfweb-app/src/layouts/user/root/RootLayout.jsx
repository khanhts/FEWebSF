import { Outlet, redirect } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import './rootlayout.css'

import React from 'react'

const RootLayout = () => {
    return (
        <div className="root-layout">
            <Navbar/>
            <Outlet/>    
        </div>
    );
}

export default RootLayout