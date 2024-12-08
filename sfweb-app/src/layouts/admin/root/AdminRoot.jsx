import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import './adminroot.css'
import { IMG_BASE_URL } from '../../../utils/const/UrlConst'
import NavDropDown from '../../../components/navdropdown/NavDropDown'
import { logOutAction } from '../../../redux/actions/adminAction'

const AdminRoot = () => {
    const admin = useSelector((state)=>state.admin);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogOut = () => {
        dispatch(logOutAction());
        navigate("/admin/signin");
    };

    return (
        <>
        {(admin.role==="ADMIN"||admin.role==="MODERATOR")?
            <>                
                <nav className='admin-nav'>
                    <NavDropDown title="Home" token={admin.access_token}/>
                    <NavDropDown title="Moderator" 
                                 links={["Logs"]}
                                 token={admin.access_token}/>
                    <NavDropDown title="Application" 
                                 links={["Account upgrade", "Report"]}
                                 token={admin.access_token}/>
                    <NavDropDown title="Price" token={admin.access_token}/>
                    <NavDropDown title={null}
                                 avatar={IMG_BASE_URL+admin.avatar}
                                 items={(<button onClick={()=>handleAdminLogOut()}>Logout</button>)}
                                 token={admin.access_token}/>
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