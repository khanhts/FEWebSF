import { signUp } from '../../services/axios/AxiosAuthen';
import './formstyle.css'
import React, { useState } from 'react'

const SignupForm = ({onButtonClicked}) => {

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(0);
    const [password, setPassword] = useState('');


    const handleFormSubmit = async(e) =>
    {
        e.preventDefault();
        let res = await signUp(username, password, fullname, gender, email)
        if(res && res.status==200)
        { 
            console.log(res)
            
        }
    }
  return (
    <div className='form-container'>
            <h2>Create a new account</h2>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" id="fullname" onChange={(e)=>{setFullname(e.target.value)}}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" id="confirmpassword"/>
                <button type='submit'><span>Sign Up</span></button>
            </form>
            <div className="translate-activation">
                <p>Already have an account?</p>
                <button className='btn-switchform' onClick={onButtonClicked}>Sign in</button>
            </div>
        </div>
  )
}

export default SignupForm