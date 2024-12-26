import { Navigate, NavLink } from 'react-router-dom'
import './formstyle.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signinAction } from '../../redux/actions/authAction';
import { useAuth } from '../../services/auth/AuthProvider';

const SigninForm = ({onButtonClicked}) => {
    const {token, setToken} = useAuth();
    // const navigate = useNavigate();

    const [username, setUsername] = useState('MacPhone');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(false);
    // const [message, setMessage] = useState('');
    // const [userID, setUserId] = useState(0);
    // const [userAvatar, setUserAvatar] = useState('')
    // const [userFullname, setUserFullname] = useState('')

    const dispatch = useDispatch();

    const handleFormSubmit = async(e) =>
    {
        e.preventDefault();
        const formData = {
            username: username,
            password: password
        }
        dispatch(signinAction(formData, setToken)).then((response)=>{
            if(response.code!=200)
                setError(response.message);
        },(error)=>{
            setError(error.message);
        });
    }

  return token==null?(
    <div className='form-container'>
            <h2>Sign in to your account</h2>
            {error &&
                <div className="error-wrapper">
                    <p className='error-display'>{error}</p>
                </div>}
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
                <NavLink to="/forgot-password">Forgot password</NavLink>
                <div className='translate-activation'>
                    <p>Don't have an account?</p>
                    <button className='btn-switchform' onClick={onButtonClicked}>Sign Up</button>
                </div>
                <NavLink to={"/admin/signin"}>Sign in as admin/mods</NavLink>
            </div>
        </div>       
  ):(<Navigate to='/'/>)
}

export default SigninForm