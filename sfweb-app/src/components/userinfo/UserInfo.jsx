import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import Post from '../post/Post'
import './userinfo.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchMe, fetchUser } from '../../services/axios/AxiosUser'
import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import { createFollow, deleteFollowStatus, fetchFollowers, fetchFollowStatus, testFetchFollowers, updateFollowStatus } from '../../services/axios/AxiosFollower'
import { ModalFollower } from '../modals/relationship/ModalFollower'
import { ModalUpgrade } from '../modals/upgrade/ModalUpgrade'

const UserInfo = () => {
  const params = useParams();
  const location = useLocation();
  const myAcc = location.state.myAcc;
  const accessToken = location.state.accessToken;
  const isCurrentUser = parseInt(params.accountID)==myAcc.id? true:false;

  const [isFocus, setIsFocus] = useState(true);
  const [isOpenFollower, setIsOpenFollower] = useState(0);
  const [isOpenUpgrade, setIsOpenUpgrade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(myAcc);
  const [followStatus, setFollowStatus] = useState("");
  const [followers , setFollowers] = useState([]);
  const [followings , setFollowings] = useState([]);
  const [totalFollower, setTotalFollower] = useState(0);
  const [totalFollowing , setTotalFollowing] = useState(0);
  const [page, setPage] = useState(1);

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
    let response = await fetchUser(parseInt(params.accountID), accessToken);
    if(response.code>=200&&response.code<300)
    {
        setProfile(response.data)
    }
  }

  const getFollowers = async() => {
    let response = await fetchFollowers("accept", parseInt(params.accountID), page, 5, accessToken);

    if(response&&response.code>=200&&response.code<=300){
      setFollowers(response.data.account);
      setTotalFollower(response.data.total);
    }
  }

  const getFollowings = async() => {
    let response = await fetchFollowers("request", parseInt(params.accountID), page, 5, accessToken);
    if(response&&response.code>=200&&response.code<=300){
      setFollowings(response.data.account);
      setTotalFollowing(response.data.total);
    }
  }

  const getFollowStatus = async() => {
    let response = await fetchFollowStatus(myAcc.id, parseInt(params.accountID), accessToken);
    if(response&&response.code>=200&&response.code<=300){
      setFollowStatus(response.data.status);
    }
  }

  const sentFriendRequest = async() => {
    let response = await createFollow(myAcc.id, parseInt(params.accountID), accessToken);
    if(response&&response.code>=200&&response.code<=300)
    { 
      setFollowStatus("request")
      setTotalFollower(totalFollower+1);
    }
  }

  const acceptFriendRequest = async() => {
    let response = await updateFollowStatus(myAcc.id,parseInt(params.accountID), accessToken);
    if(response&&response.code==20101)
      setFollowStatus("friend")
  }

  const noRelationship = async(e) => {
    let response = await deleteFollowStatus(myAcc.id, parseInt(params.accountID), accessToken)
    if(response&&response.code>=200&&response.code<=300)
    {
      setFollowStatus("no status");
      switch(e)
      {
        case 1:{
          setTotalFollowing(totalFollowing-1);
          break;
        }
        case 2:{
          setTotalFollower(totalFollower-1);
          break;
        }
        case 3:{
          setTotalFollowing(totalFollowing-1);
          setTotalFollower(totalFollower-1);
          break;
        }
      }
    } 
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

  const handleMouseHover = () => {
      setIsFocus(false);
  }

  const handleMouseLeave = () => {
      setIsFocus(true);
  }

  useEffect(()=>{
    if(!isCurrentUser)
      getProfile();
    getFollowStatus();
    getFollowers();
    getFollowings();
    setLoading(false)
  },[])
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
                                          myAcc={myAcc} 
                                          token={accessToken}></ModalUpgrade>}
        {isOpenFollower==1 && <ModalFollower 
                                          header={"Followers"}
                                          closeModal={closeModalFollower} 
                                          myAcc={myAcc} 
                                          token={accessToken} 
                                          followers={followers}
                                          isCurrentUser={isCurrentUser}>
                          </ModalFollower>}
        {isOpenFollower==2 && <ModalFollower 
                                    header={"Followings"}
                                    closeModal={closeModalFollower} 
                                    myAcc={myAcc} 
                                    token={accessToken}
                                    followers={followings}
                                    isCurrentUser={isCurrentUser}
                                    >
                              </ModalFollower>}
        <div className="user-profile-image">
            <img className='user-background' src={IMG_BASE_URL+profile.url_background_profile}/>
            <img className='user-avatar' src={IMG_BASE_URL+profile.url_avatar}/>
        </div>
        <div className="brief-info">
            <div>
                <h2>{profile.fullname}</h2>
                <div className="follower-container">
                    <p onClick={()=>openModalFollower(1)}>Follower: {totalFollower}</p>
                    <p onClick={()=>openModalFollower(2)}>Following: {totalFollowing}</p>
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
            <div className='option'>
              <div className="option-icon">
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </div>
            </div>
        </div>
        <div className="functions">
            <NavLink to={""} state={{myAcc,accessToken}}>Posts</NavLink>
            <NavLink to={"orders"}>Orders</NavLink>
            <NavLink to={"restaurants"}>Restaurants</NavLink>
        </div>
        <Outlet/>
        </>
        }
    </>
  )
}

export default UserInfo