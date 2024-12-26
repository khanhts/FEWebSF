import React, { useEffect, useState } from 'react'
import { IMG_BASE_URL } from '../../../utils/const/UrlConst';
import '../modal.css'
import { NavLink } from 'react-router-dom';

export const ModalFollower = ({header, closeModal, myAcc, followers, noRelationship, isCurrentUser}) => {

    const handleRemoveClick = async(e) => {
        const removedUserId = parseInt(e.target.value);
        let res;
        if(header=="Followers")
            res = noRelationship(1,removedUserId);
        if(header=="Followings")
            res = noRelationship(2,removedUserId);
    }

    return (
        <>
         <div className="modal-container">
            <div className="modal-box">
                <h2 className="modal-header">{header}</h2>
                <p className='modal-subheader'>{followers.length} total</p>
                <div className='modal-content-wrapper'>
                    {
                    followers.map((follower)=>{
                        return(
                            <div key={follower.id} className='account-container'>
                                <div className='left-container'>
                                    <img className='avatar-image' src={IMG_BASE_URL + follower.url_avatar}/>
                                    <NavLink to={"/profile/"+follower.id} state={{myAcc: myAcc}} className='account-fullname'>{follower.fullname}</NavLink> 
                                </div>
                                <div className='right-container'>
                                    {
                                        isCurrentUser &&
                                        <button className='btn-remove-follow'
                                                onClick={(e)=>handleRemoveClick(e)}
                                                value={follower.id}>
                                        Remove</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                    } 
                </div>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
        </>
        
  )
}
