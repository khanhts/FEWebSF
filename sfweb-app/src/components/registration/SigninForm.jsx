import './formstyle.css'
import React from 'react'

const SigninForm = ({onButtonClicked}) => {
  return (
    <div className='form-container'>
            <h2>Sign in to your account</h2>
            <form className='login-form' action="" method="post">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="login-username" placeholder='Username'/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="login-password" placeholder='Password'/>
                <button className='btn-signin'><span>Sign In</span></button>
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