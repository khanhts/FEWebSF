import { useNavigate } from 'react-router-dom';
import SigninForm from '../../../components/registration/SigninForm';
import SignupForm from '../../../components/registration/SignupForm';
import './registration.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Registration = () => {
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    const navigate = useNavigate();

    const [signUpState, setSignUpState] = useState(false);

    const handleSignUpCLick = () => {
        setSignUpState(true);
        console.log("Successfully set state")
    }

    const handleSignInClick = () => {
        setSignUpState(false);
    }

    useEffect(()=>{
        if(isAuthenticated)
            navigate("/");
    },[])

    if(isAuthenticated)
        return;
    else
        return (
            <div className={signUpState? "registration-container right-pannel-active" : "registration-container"}>
                <div className="overlay">
                    <h1>Welcome to Foodio</h1>
                    <h2>Find - Eat - Chat</h2>
                    <p>A dreamlike place for everyone with a love for foods</p>
                </div>
                <div className="left-pannel">
                    <SignupForm onButtonClicked={()=>handleSignInClick()}/>
                </div>
                <div className="right-pannel">
                    <SigninForm onButtonClicked={()=>handleSignUpCLick()}/>
                </div>
            </div>
        )
}

export default Registration