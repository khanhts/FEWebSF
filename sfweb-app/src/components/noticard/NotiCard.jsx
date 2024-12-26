import React, { useEffect, useState } from 'react'
import './noticard.css'
import { updateNotiSeenState } from '../../services/axios/AxiosNotification'
const NotiCard = ({noti, myAcc, handleSeenNoti}) => {

  const [error, setError] = useState("");

  const setNotiToSeen = async() => {
    if(!noti.is_seen){
      const response = await updateNotiSeenState(noti.id);
      if(response.isError)
        setError(response.message);
      else{
        window.location.reload();
        handleSeenNoti(noti);}
    }
  }

  return (
    <div className={noti.is_seen?'noti-card-container seen':'noti-card-container'} onClick={()=>setNotiToSeen()}>
        <div className="noti-card-header">
        </div>
        <div className="noti-card-body">
          <span>{noti.message}</span>
        </div>
    </div>
  )
}

export default NotiCard