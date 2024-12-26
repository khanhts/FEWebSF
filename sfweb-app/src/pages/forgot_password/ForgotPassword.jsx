import React, { useState } from 'react'
import { forgotPassword } from '../../services/axios/AxiosAuthen'
import { NavLink } from 'react-router-dom'
import './forgotpassword.css'
const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  }

  return (
    <div className='forgot-pass-page'>
      <div className="forgot-pass-box">
        <h2>Forgot password</h2>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Enter your email to verify</label>
            <input type="text" name='email' placeholder='Email' onChange={(e)=>handleEmailInputChange(e)}/>
          </div>
          <div className="form-action">
            <NavLink to="/registration">Return to sign in</NavLink>
            <button type='submit' className='btn-verify'>Verify</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword