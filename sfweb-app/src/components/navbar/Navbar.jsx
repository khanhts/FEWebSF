import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/actions/userAction';

const Navbar = () => {
  const dispatch = useDispatch()
  const accounts = useSelector((state)=>state.user.accounts);
  const accessToken = useSelector((state)=>state.auth.accessToken)
  const [navHover, setNavHover] = useState('');
  const navigate = useNavigate();
  const handleMouseEnter = (e) => {
    setNavHover(e.target.name);
  }
  const handleLogoClicked = () => {
    navigate("/");
  }
  const handleMouseLeave = (e) => {
    setNavHover('');
  }
  const handleNavItemClick = (e) => {
    navigate(e.target.name=='home'?'':e.target.name);
  }
  const handleCreatePostClick = (e) => {
    navigate('post/create', {state:{myAcc: accounts[0], accessToken: accessToken}})
  }
  const handleLogOutClicked = (e) => {
    dispatch(userLogout());
    navigate("/registration");
  }
  const handleProfileClicked = () => {
    navigate(`/profile/${accounts[0].id}`, {state:{myAcc: accounts[0], accessToken: accessToken}});
  }
  return (
      <div className="navbar-container"> 
          <div className="logo-container" onClick={()=>handleLogoClicked()}>
            <img className='logo' src="../img/foodioo-logo.png" alt="Foodioo"/>
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
          <div className="quick-post-container"><img src="../img/pencil-icon.png" alt="" onClick={()=>handleCreatePostClick()}/></div>
          <div className="nav-item-line"></div>
          <div className='bottom-nav-item'>
              <div className="profile-avatar" onClick={()=>handleProfileClicked()}><img src='../img/avatar-1.png' alt='' name='profile'></img></div>
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