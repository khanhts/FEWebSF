import { NavLink } from 'react-router-dom'
import './navbar.css'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar-container"> 
        <div className="logo-container">
            <h1 className='logo'>SF</h1>
        </div>
        <div className="nav-item"><NavLink to={"/"}>H</NavLink></div>
        <div className="nav-item"></div>
        <div className="nav-item"></div>
        <div className="nav-item"></div>
        <div className="quick-post-container"></div>
        <div className="nav-item-line"></div>
        <div className='bottom-nav-item'>
            <div className="profile-avatar"><NavLink to={"profile"}>P</NavLink></div>
            <div className="profile-option">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar