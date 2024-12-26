import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchMyNotifications } from '../../../services/axios/AxiosNotification';
import NotiCard from '../../../components/noticard/NotiCard';

const NotificationPage = () => {
    const location = useLocation();
    const [notiList, setNotiList] = useState(location.state.notiList);
    
    const handleSeenNoti = (noti) => {
        const notiIndex = notiList.findIndex(n=>n===noti);
        const newNotiList = [...notiList];
        newNotiList[notiIndex] = {...noti, is_seen: true};
        setNotiList(newNotiList);
    }

    return (
        <div className='main-content'>
            <div className="section-title"><h2>Notifications</h2></div>
            <div className="section-content">
                {notiList&&
                    notiList.map(noti=><NotiCard key={noti.id} noti={noti} myAcc={location.state.myAcc} handleSeenNoti={handleSeenNoti}/>)
                }
            </div>
        </div>
    )
}

export default NotificationPage