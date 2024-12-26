import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchFollowers } from '../../../services/axios/AxiosFollower';

const UserRestaurant = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const goToCreateRestaurant = () => {
    navigate(`/create-restaurant/${location.state.myAcc.id}`);
  }

  return (
    <div>
        No restaurants
        <button className='btn-create' onClick={()=>goToCreateRestaurant()}>Create new</button>
    </div>
  )
}

export default UserRestaurant