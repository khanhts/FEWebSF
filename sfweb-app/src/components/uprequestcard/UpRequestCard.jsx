import React, { useEffect, useState } from 'react'
import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import './uprequestcard.css'
const UpRequestCard = ({request, isCheckedAll, isUncheckedAll, handleCancelCheckAll, handleCancelUncheckAll,
                        handleSelect, handleDeselect, handleAcceptClicked, handleRejectClicked}) => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClicked = () => {
    if(isChecked){
      setIsChecked(false);
      handleCancelUncheckAll();
    }
    else{
      setIsChecked(true);
      handleCancelCheckAll();
    }
  }

  useEffect(()=>{
      if(isChecked)
          handleSelect(request.id)
      else
          handleDeselect(request.id)
  }, [isChecked])

  useEffect(()=>{if(isCheckedAll) setIsChecked(true)},[isCheckedAll])

  useEffect(()=>{if(isUncheckedAll) setIsChecked(false)},[isUncheckedAll])

  return (
    <div className='request-card-container'>
      <div className="request-card-header">
        <div className={isChecked? "checkbox checked":"checkbox"} onClick={()=>handleCheckBoxClicked()}>
            <div className="inner-checkbox"></div>
        </div>
        <div className='applicator-info'>
          <img src={IMG_BASE_URL+request.url_avatar} alt="avatar" />
          <p>{request.fullname}</p>
        </div>
      </div>
      <div className="resquest-card-actions">
        <button className='btn-reject-request'>Reject</button>
        <button className='btn-accept-request' onClick={()=>handleAcceptClicked(request.id)}>Accept</button>
      </div>
    </div>
  )
}

export default UpRequestCard