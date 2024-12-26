import React, { useEffect } from 'react'
import UserInfo from '../../../components/userinfo/UserInfo'
import { useSelector } from 'react-redux'
const ProfilePage = () => {  
  return (
    <>
        <div className='main-content'>
            <UserInfo/>
        </div>
        <div className="rightbar"></div>
    </>
  )
}

export default ProfilePage