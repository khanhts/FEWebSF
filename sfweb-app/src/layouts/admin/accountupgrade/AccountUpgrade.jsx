import React, { useEffect, useState } from 'react'
import "../layout.css"
import { NavLink, useLocation } from 'react-router-dom'
import { acceptUpgradeRequest, fetchAllUpgradeRequests, rejectUpgradeRequest } from '../../../services/axios/AxiosUpgrade'
import UpRequestCard from '../../../components/uprequestcard/UpRequestCard'
const AccountUpgrade = () => {
    const [requests, setRequests] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isUncheckedAll, setIsUncheckedAll] = useState(false);
    const [selectList, setSelectList] = useState([]);
    const [error, setError] = useState();

    const handleSelect = (e) => {
        setSelectList((prevList)=>prevList.concat(e));
    }

    const handleDeselect = (e) => {
        setSelectList((prevList)=>prevList.filter(value => value!=e))
    }

    const handleCheckAll = () => {
        setIsUncheckedAll(false);
        setIsCheckedAll(true);
    }

    const handleCancelCheckAll = () => {
        setIsCheckedAll(false);
    }

    const handleUnCheckAll = () => {
        setIsCheckedAll(false);
        setIsUncheckedAll(true);
    }

    const handleCancelUncheckAll = () => {
        setIsUncheckedAll(false);
    }

    const initUpgradeRequestList = async() => {
        const respone = await fetchAllUpgradeRequests();
        setRequests(respone.data)
    }

    const handleAcceptClicked = async(value) => {
        const response = await acceptUpgradeRequest(value);
        if(!response.isError){
            setError(null);
            setRequests((prevList)=>prevList.filter(request => request.id!=value));
        }
        else{
            setError(response.message);
        }
    }

    const handleRejectClicked = async(value) => {
        const response = await rejectUpgradeRequest(value);
        if(!response.isError){
            setError(null);
            setRequests((prevList)=>prevList.filter(request => request.id!=value));
        }
        else{
            setError(response.message);
        }
    }

    useEffect(()=>{
        initUpgradeRequestList()
    },[])
    
    return (
    <div className='body-container'>
        <div className="left-body">
            <p>Selected: <span>{selectList.length}</span></p>
            <button onClick={()=>handleCheckAll()}>Select all</button>
            <button onClick={()=>handleUnCheckAll()}>Deselect all</button>
            <button>Accept select</button>
            <button>Reject select</button>
        </div>
        <div className="middle-body">
            <div className="list-container">
                 {requests && requests.map(request=>(<UpRequestCard key={request.id} 
                                                                    request={request}
                                                                    isCheckedAll={isCheckedAll}
                                                                    handleCancelCheckAll={handleCancelCheckAll}
                                                                    isUncheckedAll={isUncheckedAll}
                                                                    handleCancelUncheckAll={handleCancelUncheckAll}
                                                                    handleSelect={handleSelect}
                                                                    handleDeselect={handleDeselect}
                                                                    handleAcceptClicked={handleAcceptClicked}
                                                                    handleRejectClicked={handleRejectClicked}/>))}
            </div>
        </div>
    </div>
    )
}

export default AccountUpgrade