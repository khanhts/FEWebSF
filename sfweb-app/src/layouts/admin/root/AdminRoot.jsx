import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import './adminroot.css'
import { IMG_BASE_URL } from '../../../utils/const/UrlConst'
import NavDropDown from '../../../components/navdropdown/NavDropDown'
import { logOutAction } from '../../../redux/actions/adminAction'
import { AuthProvider, useAuth } from '../../../services/auth/AuthProvider'

const AdminRoot = () => {
    const admin = useSelector((state)=>state.admin);
    
    const {setTokenADM} = useAuth();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogOut = () => {
        dispatch(logOutAction());
        setTokenADM(null);
        navigate("/admin/signin");
    };

    return (
        <>
        {(admin.role==="ADMIN"||admin.role==="MODERATOR")?
            <>                
                <nav className='admin-nav'>
                    <NavDropDown title="Home"/>
                    <NavDropDown title="Moderator" 
                                 links={["Logs"]}/>
                    <NavDropDown title="Application" 
                                 links={["Account upgrade", "Report"]}/>
                    <NavDropDown title="Price"/>
                    <NavDropDown title={null}
                                 avatar={IMG_BASE_URL+admin.avatar}
                                 items={(<button onClick={()=>handleAdminLogOut()}>Logout</button>)}/>
                </nav>
                <Outlet/>
            </>
            :
            <Navigate to="/access-denied"/>
        }
        </>
  );
}

export default AdminRoot