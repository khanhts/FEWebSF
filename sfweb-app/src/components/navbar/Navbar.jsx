import { NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions/userAction';

const Navbar = () => {
  const dispatch = useDispatch()
  const [navHover, setNavHover] = useState('');
  const navigate = useNavigate();
  const handleMouseEnter = (e) => {
    setNavHover(e.target.name);
  }
  const handleMouseLeave = (e) => {
    setNavHover('');
  }
  const handleNavItemClick = (e) => {
    navigate(e.target.name=='home'?'':e.target.name);
  }
  const handleLogOutClicked = (e) => {
    dispatch(userLogout());
    navigate("/registration");
  }
  return (
      <div className="navbar-container"> 
          <div className="logo-container">
              <h1 className='logo'>SF</h1>
          </div>
          <div className="nav-item-container">
            <div className="item-icon">
              <div className="nav-item"  onClick={(e)=>handleNavItemClick(e)}>
                <img src='../img/home-icon.png' alt='' name='home' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
              <div className="nav-item" onClick={(e)=>handleNavItemClick(e)}>
              <img src='../img/notification-icon.png' alt='' name='notification' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
              <div className="nav-item" onClick={(e)=>handleNavItemClick(e)}>
              <img src='../img/restaurant-icon.png' alt='' name='search-restaurant' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
              <div className="nav-item" onClick={(e)=>handleNavItemClick(e)}>
              <img src='../img/downarrow-icon.png' alt='' name='more' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
            </div>
            <div className={navHover===''?"item-name":"item-name appear"}>
              <p className={navHover=='home'?'animated':'inanimated'}>Home</p>
              <p className={navHover=='notification'?'animated':'inanimated'}>Notification</p>
              <p className={navHover=='search-restaurant'?'animated':'inanimated'}>Restaurant</p>
              <p className={navHover=='more'?'animated':'inanimated'}>More</p>
            </div>
          </div>
          <div className="quick-post-container"><img name="post/create" src="../img/pencil-icon.png" alt="" onClick={(e)=>handleNavItemClick(e)}/></div>
          <div className="nav-item-line"></div>
          <div className='bottom-nav-item'>
              <div className="profile-avatar" onClick={(e)=>handleNavItemClick(e)}><img src='../img/avatar-1.png' alt='' name='profile'></img></div>
              <div className="profile-option">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
              </div>
          </div>
          <button className='btn-logout' onClick={(e)=>handleLogOutClicked(e)}>Log out</button>
      </div>
  )
}

export default Navbar