import SigninForm from '../../../components/registration/SigninForm';
import SignupForm from '../../../components/registration/SignupForm';
import './registration.css'
import React, { useState } from 'react'

const Registration = () => {
    const [signUpState, setSignUpState] = useState(false);

    const handleSignUpCLick = () => {
        setSignUpState(true);
        console.log("Successfully set state")
    }

    const handleSignInClick = () => {
        setSignUpState(false);
    }

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