import React from 'react'
import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import './usercard.css'
import { useNavigate } from 'react-router-dom'

const UserCard = ({account, myAcc, accessToken}) => {

    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/profile/${account.id}`, {state:{myAcc,accessToken}})
    }

    return (
        <div className='account-card-container' onClick={()=>handleCardClick()}>
            <div className="account-card-wrapper">
                <div className="account-card-info">
                    <div className="account-card-avatar">
                        <img src={IMG_BASE_URL+account.url_avatar} alt="" />
                    </div>
                    <p>{account.fullname}</p>
                </div>
                <div className="account-card-action">
                    <button className='btn-follow'>+</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard