import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../services/auth/AuthProvider';
import { IMG_BASE_URL } from '../../utils/const/UrlConst';
import { fetchMyNotifications } from '../../services/axios/AxiosNotification';
import { logoutAction } from '../../redux/actions/authAction';
import { accountSignOutAction } from '../../redux/actions/accountAction';

const Navbar = ({account}) => {
  const {setToken} = useAuth();

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [navHover, setNavHover] = useState('');
  const [notiList, setNotiList] = useState([])
  const [newNoti, setNewNoti] = useState(0);
  const [isShown, setIsShown] = useState(false);


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
    navigate(e.target.name=='home'?'':e.target.name, {state:{myAcc: account}});
  }
  const goToNotiPage = () => {
    navigate('notification',{state:{myAcc: account, notiList: notiList}})
  }
  const handleCreatePostClick = (e) => {
    navigate('post/create', {state:{myAcc: account}})
  }
  const handleLogOutClicked = (e) => {
    dispatch(logoutAction());
    setToken(null);
  }
  const handleProfileOptionClicked = () => {
    if(isShown)
      setIsShown(false)
    else
      setIsShown(true)
  }
  const handleProfileClicked = () => {
    navigate(`/profile/${account.id}`, {state:{myAcc: account}});
  }
  const initNotiList = async() => {
    const response = await fetchMyNotifications(account.id,1,5)
    if(response&&response.code>=200&&response.code<=300){
        setNotiList(response.data);
        const unseenList = response.data?.filter(noti=>!noti.is_seen);
        console.log("Unseen list: ", unseenList);
        setNewNoti(unseenList?.length);
    }
  }
  
  const handleSwitchAcc = () => {
    dispatch(accountSignOutAction());
  }

  useEffect(()=>{
    console.log("My Acc: ", account);
    initNotiList();
  },[])
  return (
      <div className="navbar-container"> 
          <div className="logo-container" onClick={()=>handleLogoClicked()}>
            <img className='logo' src="/img/foodioo-logo.png" alt="Foodioo"/>
          </div>
          <div className="nav-item-container">
            <div className="item-icon">
              <div className="nav-item"  onClick={(e)=>handleNavItemClick(e)}>
                <img src='/img/home-icon.png' alt='' name='home' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
              <div className="nav-item" onClick={()=>goToNotiPage()}>
                <img src='/img/notification-icon.png' alt='' name='notification' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
               {newNoti>0&&<div className="noti-dot">{newNoti}</div>}
              </div>
              <div className="nav-item" onClick={(e)=>handleNavItemClick(e)}>
                <img src='/img/restaurant-icon.png' alt='' name='search-restaurant' 
                      onMouseEnter={(e)=>handleMouseEnter(e)}
                      onMouseLeave={(e)=>handleMouseLeave(e)}>
                </img>
              </div>
              <div className="nav-item" onClick={(e)=>handleNavItemClick(e)}>
                <img src='/img/downarrow-icon.png' alt='' name='more' 
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
          <div className="quick-post-container"><img src="/img/pencil-icon.png" alt="" onClick={()=>handleCreatePostClick()}/></div>
          <div className="nav-item-line"></div>
          <div className='bottom-nav-item'>
              <div className="profile-avatar" onClick={()=>handleProfileClicked()}><img src={IMG_BASE_URL + account.url_avatar} alt='' name='profile'></img></div>
              <div className="profile-option" onClick={()=>handleProfileOptionClicked()}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
              </div>
            { isShown && <div className="option-menu" onMouseLeave={()=>handleProfileOptionClicked()}>
                <button className="btn-switch" type='button' onClick={()=>handleSwitchAcc()}>Switch account</button>
                <button className="btn-logout" type='button' onClick={()=>handleLogOutClicked()}>Log out</button>
              </div>}
          </div>
      </div>
  )
}

export default Navbar