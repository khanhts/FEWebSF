import { useNavigate } from 'react-router-dom'
import './formstyle.css'
import React, { useState } from 'react'
import { signIn } from '../../services/axios/AxiosAuthen';

const SigninForm = ({onButtonClicked}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleFormSubmit = async(e) =>
        {
            e.preventDefault();
            let res = await signIn(username, password)
            if(res && res.status==200)
            {
                console.log("Sign in successfully");
                navigate("/");
            }
            console.log(res);
        }
  return (
    <div className='form-container'>
            <h2>Sign in to your account</h2>
            <form className='login-form' onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="login-username" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="login-password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type='submit'><span>Sign In</span></button>
            </form>
            <div className='seperate-line'></div>
            <div className="signin-functions">
                <button className='btn-google-signin'>Google</button>
                <p><a href="">Forgot password?</a></p>
                <div className='translate-activation'>
                    <p>Don't have an account?</p>
                    <button className='btn-switchform' onClick={onButtonClicked}>Sign Up</button>
                </div>
            </div>
        </div>       
  )
}

export default SigninForm