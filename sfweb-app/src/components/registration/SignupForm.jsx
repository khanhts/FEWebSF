import './formstyle.css'
import React from 'react'

const SignupForm = ({onButtonClicked}) => {
  return (
    <div className='form-container'>
            <h2>Create a new account</h2>
            <form className='signup-form' action="" method="post">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" id="confirm-password" />
                <button className='btn-signup'><span>Sign Up</span></button>
            </form>
            <div className="translate-activation">
                <p>Already have an account?</p>
                <button className='btn-switchform' onClick={onButtonClicked}>Sign in</button>
            </div>
        </div>
  )
}

export default SignupForm