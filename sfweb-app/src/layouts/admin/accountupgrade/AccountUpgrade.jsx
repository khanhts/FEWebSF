import React, { useEffect, useState } from 'react'
import "../layout.css"
import { NavLink, useLocation } from 'react-router-dom'
import { fetchAllUpgradeRequests } from '../../../services/axios/AxiosUpgrade'
import UpRequestCard from '../../../components/uprequestcard/UpRequestCard'
const AccountUpgrade = () => {
    const location = useLocation() 

    const [requests, setRequests] = useState([]);

    const initUpgradeRequestList = async() => {
        const respone = await fetchAllUpgradeRequests(location.state)
        setRequests(respone.data)
    }

    useEffect(()=>{
        initUpgradeRequestList()
    },[])
    
    return (
    <div className='body-container'>
        <div className="left-body">
            <p>Selected: <span>0</span></p>
            <button>Accept all</button>
            <button>Reject all</button>
            <button>Deselect all</button>
        </div>
        <div className="middle-body">
            <div className="list-container">
                 {requests && requests.map(request=>(<UpRequestCard key={request.id} request={request}/>))}
            </div>
        </div>
    </div>
    )
}

export default AccountUpgrade