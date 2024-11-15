import { NavLink, Outlet } from 'react-router-dom'
import Post from '../post/Post'
import './userinfo.css'
import React from 'react'

const UserInfo = () => {
  return (
    <>
        <div className="user-background">
                <div className="user-avatar">
                </div>
            </div>
            <div className="brief-info">
                <div>
                    <h2>User's name</h2>
                    <div className="follower-container">
                        <p>Follower: 0</p>
                        <p>Following: 0</p>
                    </div>
                </div>
                <div>
                    <button className='btn-account-upgrade'>Upgrade</button>
                </div>
                <div className='option'>
                    <div className='dot'></div>
                    <div className='dot'></div>
                    <div className='dot'></div>
                </div>
            </div>
            <div className="functions">
                <NavLink to={""}>Posts</NavLink>
                <NavLink to={"orders"}>Orders</NavLink>
                <NavLink to={"restaurants"}>Restaurants</NavLink>
            </div>
            <Outlet/>
    </>
  )
}

export default UserInfo