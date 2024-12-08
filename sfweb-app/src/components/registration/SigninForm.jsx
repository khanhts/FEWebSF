import { NavLink, useNavigate } from 'react-router-dom'
import './formstyle.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signinAction } from '../../redux/actions/authAction';
import { useAuth } from '../../services/auth/AuthProvider';
import { fetchUserAction } from '../../redux/actions/userAction';

const SigninForm = ({onButtonClicked}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('MacPhone');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [userID, setUserId] = useState(0);
    const [userAvatar, setUserAvatar] = useState('')
    const [userFullname, setUserFullname] = useState('')

    const dispatch = useDispatch();


    const handleFormSubmit = async(e) =>
        {
            e.preventDefault();
            const formData = {
                username: username,
                password: password
            }
            dispatch(signinAction(formData, navigate));
            // let response = await signIn(username, password)
            // if(response && response.data.code>=200 && response.data.code<=300)
            // {
            //     setError(false);
            //     setMessage('');
            //     let response2 = await fetchMe(response.data.data.access_token)
            //     console.log("Get Me: ",response2)
            //     if(response2&&response2.code==200)
            //     {
            //         setAccessToken(response.data.data.access_token);
            //         setRefreshToken(response.data.data.refresh_token)
            //         setUserId(response2.data.accounts[0].id)
            //         setUserFullname(response2.data.accounts[0].fullname)
            //         setUserAvatar(response2.data.accounts[0].url_avatar)
            //     }
                
            // }
            // setError(true);
            // setMessage(response.data.message);
        }
        // useEffect(()=>{
        //     if(accessToken!='')
        //         { dispatch(doLogin({data: { access_token: accessToken, 
        //                                     refresh_token: refreshToken, 
        //                                     userID: userID,
        //                                     userAvatar: userAvatar,
        //                                     userFullname: userFullname
        //                                     }}))
        //             navigate("/");}
        // }, [accessToken])
  return (
    <div className='form-container'>
            <h2>Sign in to your account</h2>
            <form className='login-form' onSubmit={async(e)=>handleFormSubmit(e)}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="login-username" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="login-password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} autoComplete='false'/>
                <button type='submit'><span>Sign In</span></button>
            </form>
            <div className='seperate-line'></div>
            <div className="signin-functions">
                <button className='btn-google-signin'>Google</button>
                <NavLink to={"/forgot-password"}>Forgot password</NavLink>
                <div className='translate-activation'>
                    <p>Don't have an account?</p>
                    <button className='btn-switchform' onClick={onButtonClicked}>Sign Up</button>
                </div>
                <NavLink to={"/admin/signin"}>Sign in as admin/mods</NavLink>
            </div>
        </div>       
  )
}

export default SigninForm