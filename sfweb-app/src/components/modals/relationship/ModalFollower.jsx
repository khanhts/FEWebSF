import React, { useEffect, useState } from 'react'
import { IMG_BASE_URL } from '../../../utils/const/UrlConst';
import '../modal.css'
import { NavLink } from 'react-router-dom';

export const ModalFollower = ({header, closeModal, myAcc, followers, isCurrentUser, token}) => {
    const [followerList, setFollowerList] = useState(followers)
   
    let removedUserId = 0;

    function checkRemove(value){
        return value.user_id != removedUserId;
    }

    const handleRemoveClick = async(e) => {
        removedUserId = parseInt(e.target.value)
        console.log("This user id: ",user_id)
        console.log("Remove user id: ",removedUserId)
        // let res = await removeFollower(user_id, removedUserId, token)
        // console.log(res)
        // if(res && res.statusCode === 200)
        //     setFollowerList((prevList) => prevList.filter(checkRemove))
    }

    useEffect(()=>{

    }, [followerList])

    return (
        <>
         <div className="modal-container" onClick={closeModal}>
            <div className="modal-box">
                <h2 className="modal-header">{header}</h2>
                <p className='modal-subheader'>{followerList.length} total</p>
                <div className='modal-content-wrapper'>
                    {
                    followerList.map((follower)=>{
                        return(
                            <div className='account-container'>
                                <div className='left-container'>
                                    <img className='avatar-image' src={IMG_BASE_URL + follower.url_avatar}/>
                                    <NavLink to={"/profile/"+follower.id} state={{myAcc: myAcc,accessToken: token}} className='account-fullname'>{follower.fullname}</NavLink> 
                                </div>
                                <div className='right-container'>
                                    {/* {
                                        isCurrentUser &&
                                        <button className='btn-remove-follow'
                                                onClick={handleRemoveClick}
                                                value={follower.user_id}>
                                        Remove</button>
                                    } */}
                                </div>
                            </div>
                        )
                    })
                    } 
                </div>
            </div>
        </div>
        </>
        
  )
}
