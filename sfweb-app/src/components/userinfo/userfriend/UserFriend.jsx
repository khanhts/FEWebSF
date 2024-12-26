import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFollowers } from '../../../services/axios/AxiosFollower';

const UserFriend = () => {
  const params =  useParams()

  const [friendList, setFriendList] = useState([]);

  const initFriendList = async() => {
  const response = await fetchFollowers("friend", parseInt(params.accountID), 1, 5);
  if(response&&response.code>=200&&response.code<=300){
      setFriendList(response.data.account);
  }
  }

  useEffect(()=>{
      initFriendList();
  },[])

  return (
    <div>
      {
        friendList.length>0?
        <p>User friend list</p>
        :
        <p>You don't have any friends</p>
      }
    </div>
  )
}

export default UserFriend