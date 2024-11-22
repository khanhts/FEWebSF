import { signUp } from '../../services/axios/AxiosAuthen';
import './formstyle.css'
import React, { useState } from 'react'

const SignupForm = ({onButtonClicked}) => {

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleInputBlur = (event) => {
        switch(event.id){
            case "username":
                {if(username.length<6||username.length>16)
                {    
                    if(messages.includes("Username only contains from 6 to 16 letters"))
                        break;
                    setMessages([...messages, "Username only contains from 6 to 16 letters"]);
                }
                else{
                    setMessages(messages.filter(m=>m!="Username only contains from 6 to 16 letters"));
                }
                break;}
            case "email":
                {if(!(email.includes(".com")) && !(email.includes(".edu")))
                {    
                    if(messages.includes("Wrong email format"))
                        break;
                    setMessages([...messages, "Wrong email format"]);
                }
                else{
                    setMessages(messages.filter(m=>m!="Wrong email format"));
                }
                break;}
            case "confirmpassword":
                {
                    if(!(confirmpassword===password))
                    {    
                        if(messages.includes("Password not match"))
                            break;
                        setMessages([...messages, "Password not match"]);
                    }
                    else{
                        setMessages(messages.filter(m=>m!="Password not match"));
                    }
                    break;
                }
        }
    } 


    const handleFormSubmit = async(e) =>
    {
        e.preventDefault();
        let respond = await signUp(username, password, fullname, gender, email)
        if(respond && respond.status==200)
        { 
            if(respond.data.code>=200 && respond.data.code<=300)
            {
                setError(false);
                setMessages([]);
                onButtonClicked();
            }
        }
        else{
            setError(true);
            setMessages(...messages, respond.data.message);
        }
        console.log(respond)
    }
  return (
    <div className='form-container'>
            <h2>Create a new account</h2>
            <form className='signup-form' onSubmit={handleFormSubmit}>
                {messages.length>0? <ul>{messages.map((message)=> <li className='error-message'><p>{message}</p></li>)}</ul>
                        :<></>}
                <label htmlFor="fullname">Fullname</label>
                <input type="text" name="fullname" id="fullname" onChange={(e)=>{setFullname(e.target.value)}} required/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={(e)=>{setUsername(e.target.value)}} onBlur={(e)=>handleInputBlur(e.target)} required/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} onBlur={(e)=>handleInputBlur(e.target)} required/>
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={(e)=>{setGender(parseInt(e.target.value))}}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" autoComplete='false' onChange={(e)=>{setPassword(e.target.value)}}/>
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" id="confirmpassword" autoComplete='false' onChange={(e)=>{setConfirmPassword(e.target.value)}} onBlur={(e)=>handleInputBlur(e.target)}/>
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