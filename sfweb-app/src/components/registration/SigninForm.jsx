import { useNavigate } from 'react-router-dom'
import './formstyle.css'
import React, { useEffect, useState } from 'react'
import { signIn } from '../../services/axios/AxiosAuthen';
import { useDispatch } from 'react-redux';
import { doLogin, getMe } from '../../redux/actions/userAction';
import { fetchMe } from '../../services/axios/AxiosUser';

const SigninForm = ({onButtonClicked}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('MacPhone');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [userID, setUserId] = useState(0);
    const [userAvatar, setUserAvatar] = useState('')
    const [userFullname, setUserFullname] = useState('')

    const dispatch = useDispatch();


    const handleFormSubmit = async(e) =>
        {
            e.preventDefault();
            let respond = await signIn(username, password)
            if(respond && respond.data.code>=200 && respond.data.code<=300)
            {
                setError(false);
                setMessage('');
                let response2 = await fetchMe(respond.data.data.access_token)
                if(response2&&response2.code==200)
                {
                    setAccessToken(respond.data.data.access_token);
                    setRefreshToken(respond.data.data.refresh_token)
                    setUserId(response2.data[0].id)
                    setUserFullname(response2.data[0].fullname)
                    setUserAvatar(response2.data[0].url_avatar)
                }
                console.log(response2)
            }
            setError(true);
            setMessage(respond.data.message);
        }
        useEffect(()=>{
            if(accessToken!='')
                { dispatch(doLogin({data: { access_token: accessToken, 
                                            refresh_token: refreshToken, 
                                            userID: userID,
                                            userAvatar: userAvatar,
                                            userFullname: userFullname
                                            }}))
                    navigate("/");}
        }, [accessToken])
  return (
    <div className='form-container'>
            <h2>Sign in to your account</h2>
            <form className='login-form' onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="login-username" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="login-password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} autoComplete='false'/>
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