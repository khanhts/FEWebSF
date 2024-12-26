import { Navigate, NavLink, useSearchParams } from 'react-router-dom';
import './resetpassword.css'

import React, { useEffect, useState } from 'react'
import { resetPassword } from '../../services/axios/AxiosAuthen';

const ResetPassword = () => {
    const [searchParams]= useSearchParams();

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [resetError, setResetError] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(true);

    const handleNewPasswordInputChange = (e) => {
        setNewPass(e.target.value);
    }

    const handleConfirmPasswordInputChange = (e) => {
        setConfirmPass(e.target.value);
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        if(newPass===confirmPass&&newPass.length>=8){
            const formData = {
                kamehameha: searchParams.get("token"),
                new_password: newPass
            }
            const response = await resetPassword(formData);
            console.log("Check status: ", response);
            
            if(response.isError)
                setResetError(response.message)
            else{

                setResetError(null)}
        }
        else if(newPass.length<8){
            setResetError("Password must have at least 8 characters");
        }
        else
            setResetError("Passwords do not match");
    }

    return (
        <>
            {searchParams.get("token")!=null?
            <div className='reset-pass-page'>
                <div className="reset-pass-box">
                    {resetSuccess&&
                        <div className="confirmation-box">
                            <h2>Successfully reset</h2>
                            <img className='confety effect1' src="../img/confety-paper-icon.png"/>
                            <img className='confety effect2' src="../img/confety-paper-icon.png"/>
                            <img className='confety effect3' src="../img/confety-paper-icon.png"/>
                            <img className='confety effect4' src="../img/confety-paper-icon.png"/>
                            <img className='confety effect5' src="../img/confety-paper-icon.png"/>
                            <img src="../img/check-mark-icon.png" alt="success" />
                        </div>
                    }
                    <div className='frm-reset-container'>
                    <h2>Reset password</h2>
                    {resetError &&
                        <div className="error-wrapper">
                            <p className='error-display'>{resetError}</p>
                        </div>
                    }
                    <form className='frm-reset-pass' onSubmit={(e)=>handleFormSubmit(e)}>
                        <div className="form-group">
                        <label htmlFor="new-password">New password</label>
                        <input type="password" name='new-password' placeholder='New password' onChange={(e)=>handleNewPasswordInputChange(e)} autoComplete='false'/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input type="password" name='confirm-password' placeholder='Confirm password' onChange={(e)=>handleConfirmPasswordInputChange(e)} autoComplete='false'/>
                        </div>
                        <div className="form-action">
                        <NavLink to="/registration">Return to sign in</NavLink>
                        <button type='submit' className='btn-confirm'>Confirm</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            :
            <Navigate to="/registration"/>
            }
        </>
    )
}

export default ResetPassword