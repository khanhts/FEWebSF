import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import './userinfo.css'
import React, { useEffect, useState } from 'react'
import { fetchUser } from '../../services/axios/AxiosUser'
import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import { createFollow, deleteFollowStatus, fetchFollowers, fetchFollowStatus, updateFollowStatus } from '../../services/axios/AxiosFollower'
import { ModalFollower } from '../modals/relationship/ModalFollower'
import { ModalUpgrade } from '../modals/upgrade/ModalUpgrade'
import ModalProfileChange from '../modals/profilechange/ModalProfileChange'

const UserInfo = () => {
  const params = useParams();
  const location = useLocation();
  const myAcc = location.state.myAcc;

  const [isFocus, setIsFocus] = useState(true);
  const [isOpenFollower, setIsOpenFollower] = useState(0);
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  const [isOpenProfileUpdate, setIsOpenProfileUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(myAcc);
  const [followStatus, setFollowStatus] = useState("");
  const [followers , setFollowers] = useState([]);
  const [followings , setFollowings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState()


  // const getMyProfile = async() => {
  //   console.log("Start fetching my profile ...")
  //   let response = await fetchMe(myAcc.accessToken);
  //   if(response.code>=200&&response.code<300)
  //   {
  //       setProfile(response.data.accounts[0])
  //       setLoading(false);
  //   }
  //   console.log("Finish: ", response);
  // }

  const getProfile = async() => {
    let response = await fetchUser(parseInt(params.accountID));
    if(response.code>=200&&response.code<300)
    {
        setProfile(response.data)
    }
  }

  const getFollowers = async() => {
    let response = await fetchFollowers("accept", parseInt(params.accountID), 1, 5);

    if(response&&response.code>=200&&response.code<=300){
      setFollowers(response.data.account);
    }
  }

  const getFollowings = async() => {
    let response = await fetchFollowers("request", parseInt(params.accountID), 1, 5);
    if(response&&response.code>=200&&response.code<=300){
      setFollowings(response.data.account);
    }
  }

  const getFollowStatus = async() => {
    let response = await fetchFollowStatus(myAcc.id, parseInt(params.accountID));
    if(response&&response.code>=200&&response.code<=300){
      setFollowStatus(response.data.status);
    }
  }

  const sentFriendRequest = async() => {
    let response = await createFollow(myAcc.id, parseInt(params.accountID));
    if(response&&response.code>=200&&response.code<=300)
    { 
      setFollowStatus("request")
    }
  }

  const acceptFriendRequest = async() => {
    let response = await updateFollowStatus(myAcc.id,parseInt(params.accountID));
    if(response&&response.code==20101)
      setFollowStatus("friend")
  }

  let removedUserId = 0;

  const checkRemove = (value) => {
    return value.id != removedUserId;
  }

  const noRelationship = async(e,followerID=parseInt(params.accountID)) => {
    removedUserId = followerID;
    let response = await deleteFollowStatus(myAcc.id, followerID);
    if(response&&response.code>=200&&response.code<=300)
    {
      setFollowStatus("no status");
      switch(e)
      {
        case 1:{
          setFollowers((prevList) => prevList.filter(checkRemove));
          break;
        }
        case 2:{
          setFollowings((prevList) => prevList.filter(checkRemove));
          break;
        }
        case 3:{

          break;
        }
      }
      return 0
    } 
    return 1
  }

  const openModalFollower = (e) => {
    setIsOpenFollower(e);
  }

  const closeModalFollower = () => {
    setIsOpenFollower(0)
  }

  const openModalUpgrade = () => {
    setIsOpenUpgrade(true);
  }

  const closeModalUpgrade = () => {
    if(isFocus)
      setIsOpenUpgrade(false);
  }

  const openModalProfileUpdate = () => {
    setIsOpenProfileUpdate(true);
  }

  const closeModalProfileUpdate = () => {
    setIsOpenProfileUpdate(false);
  }

  const handleMouseHover = () => {
      setIsFocus(false);
  }

  const handleMouseLeave = () => {
      setIsFocus(true);
  }

  useEffect(()=>{
    if(parseInt(params.accountID)!=myAcc.id){
      setIsCurrentUser(false);
      getProfile();}
    else{
      setIsCurrentUser(true);
      setProfile(myAcc)}
    getFollowStatus();
    getFollowers();
    getFollowings();
    setLoading(false)
  },[location.pathname])
  return (
    <>
        {loading?
        <></>
        :
        <>
        {isOpenUpgrade && <ModalUpgrade   isOpenUpgrade={isOpenUpgrade}
                                          closeModal={closeModalUpgrade}
                                          handleMouseHover={handleMouseHover}
                                          handleMouseLeave={handleMouseLeave}
                                          myAcc={myAcc}></ModalUpgrade>}
        {isOpenFollower==1 && <ModalFollower 
                                          header={"Followers"}
                                          closeModal={closeModalFollower} 
                                          myAcc={myAcc} 
                                          followers={followers}
                                          isCurrentUser={isCurrentUser}
                                          noRelationship={noRelationship}>
                          </ModalFollower>}
        {isOpenFollower==2 && <ModalFollower 
                                    header={"Followings"}
                                    closeModal={closeModalFollower} 
                                    myAcc={myAcc} 
                                    followers={followings}
                                    isCurrentUser={isCurrentUser}
                                    noRelationship={noRelationship}>
                              </ModalFollower>}
        {isOpenProfileUpdate && <ModalProfileChange closeModal={closeModalProfileUpdate} account={myAcc}/>}
        <div className="user-profile-image">
            <img className='user-background' src={IMG_BASE_URL+profile.url_background_profile}/>
            <img className='user-avatar' src={IMG_BASE_URL+profile.url_avatar}/>
        </div>
        <div className="brief-info">
            <div className='info-wrapper'>
              <div className='info-context'>
                <h2>{profile.fullname}</h2>
                {profile.is_upgrade && <div><img className='verified-mark' src="../img/verified-acc-icon.png" alt="" /></div>}
              </div>
              <div className="follower-container">
                  <p onClick={()=>openModalFollower(1)}>Follower: {followers.length}</p>
                  <p onClick={()=>openModalFollower(2)}>Following: {followings.length}</p>
              </div>
            </div>
            <div className='account_actions'>
                {myAcc.id!=profile.id?
                  <>
                    {followStatus === "no status" && <button className="btn-add-friend" onClick={async()=>sentFriendRequest()}>Add friend</button>}
                    {followStatus === "accept" && 
                      <>
                        <button className="btn-denied-friend" onClick={async()=>noRelationship(1)}>Denined request</button>
                        <button className="btn-accept-friend" onClick={async()=>acceptFriendRequest()}>Accept request</button>
                      </>}
                    {followStatus === "request" && <button className="btn-unfollow" onClick={async()=>noRelationship(2)}>Following</button>}
                    {followStatus === "friend" && <button className="btn-unfriend" onClick={async()=>noRelationship(3)}>Friend</button>}
                  </>
                  :
                  <></>
                }
                {!profile.is_upgrade && parseInt(params.accountID)==myAcc.id &&
                <button className='btn-account-upgrade' onClick={()=>openModalUpgrade()}>Upgrade</button>}

            </div>
            {isCurrentUser&&
            <div className='option'>
              <div className="option-icon">
               <img src="/img/setting-icon.png" alt="setting" onClick={()=>openModalProfileUpdate()}/>
              </div>
            </div>}
        </div>
        <div className="functions">
            <NavLink to={""} state={{myAcc}}>Posts</NavLink>
            <NavLink to={"orders"} state={{myAcc}}>Orders</NavLink>
            <NavLink to={"friend"} state={{myAcc}}>Friend</NavLink>
            { profile.is_upgrade && <NavLink to={"restaurants"} state={{myAcc}}>Restaurants</NavLink>}
        </div>
        <Outlet/>
        </>
        }
    </>
  )
}

export default UserInfo