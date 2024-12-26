import React, { useState } from 'react'
import './adminsignin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAdminAction, signInAction } from '../../../redux/actions/adminAction'
import { useAuth } from '../../../services/auth/AuthProvider'

const AdminSignIn = () => {

    const {setToken, setTokenADM}= useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signingIn, setSigningIn] = useState(false);
    const [signinError, setSigninError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSigninFormSubmit = async(e) => {
        setSigningIn(true);
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        dispatch(signInAction(data,setTokenADM, navigate)).then((response)=>{
            if(response.isError)
                setSigninError(response.message)
        },(error)=>{
            setSigninError(error.message);
        });

            
        setSigningIn(false)
    }

    return (
        <div className='admin-signin-page'>
            <div className="signin-box">
                <div className="sign-box-wrapper">
                    <div className="logo-holder">
                        <img className='logo-image' src="../img/foodioo-logo.png" alt="Foodioo" />
                    </div>
                    <p className='signin-title'>Sign in as admin/mod</p>
                    <form onSubmit={(e)=>handleSigninFormSubmit(e)}>
                        <div className="form-element">
                            <input className='username-input' type="text" placeholder='Username' aria-label='Username' onChange={(e)=>handleUsernameChange(e)}/>
                        </div>
                        <div className="form-element">
                            <input className='password-input' type="password" placeholder='Password' aria-label='Password' autoComplete='false' onChange={(e)=>handlePasswordChange(e)}/>
                        </div>
                        {signinError &&
                            <div className="error-wrapper">
                                <p className='error-display'>{signinError}</p>
                            </div>
                        }
                        <div className="form-action">
                            <Link to="/">Back to user sign in</Link>
                            <button type='submit' className={signingIn? "btn-signin animated":"btn-signin"} disabled={signingIn}>
                                {signingIn? 
                                    <>
                                    <span>Signing in </span>
                                    <div className='first-dot'>.</div>
                                    <div className='second-dot'>.</div>
                                    <div className='third-dot'>.</div>
                                    </>
                                : 
                                    <span>Sign in</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminSignIn