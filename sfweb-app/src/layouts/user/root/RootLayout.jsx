import { Navigate, Outlet} from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import { useSelector } from 'react-redux';
import './rootlayout.css'

import React from 'react'
import ModalAccounts from '../../../components/modals/accounts/ModalAccounts';
import { useAuth } from '../../../services/auth/AuthProvider';


const RootLayout = () => {
    const {token} = useAuth();
    const user = useSelector((state)=>state.user);
    const currentAcc = useSelector((state)=>state.currentAcc);
    return token!=null? currentAcc.isSignIn?(
        <div className="root-layout">
            <Navbar account={currentAcc.data}/>
            <Outlet/>
        </div>
    )
    :(
        <ModalAccounts accountList={user.accounts}/>
    )
    :(<Navigate to="/registration"/>);
}

export default RootLayout