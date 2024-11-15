import { signUp } from '../../services/axios/AxiosAuthen';
import './formstyle.css'
import React, { useState } from 'react'

const SignupForm = ({onButtonClicked}) => {

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleFormSubmit = async(e) =>
    {
        e.preventDefault();
        // let res = await signUp()
        // if(res && res.status==200)
        // { 
        //     onButtonClicked();
        // }
        // console.log(user);
        onButtonClicked();
    }
  return (
    <div className='form-container'>
            <h2>Create a new account</h2>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" id="fullname"/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender">
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" id="confirmpassword" />
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