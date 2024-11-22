import './restaurantdetail.css'

import React from 'react'

const RestaurantDetail = () => {
  return (
    <div className='restaurant-detail-container'>
        <div className="restaurant-images">
                <div className="restaurant-background"><img src="./img/restaurant1-bg.jpg" alt="" /></div>
                <div className="restaurant-logo"><img src="./img/restaurant1-logo.jpg" alt="" /></div>
        </div>
        <div className="restaurant-info-wrapper">
            <div className="restaurant-info">
                <h2 className="restaurant-name">Restaurant's Name</h2>
                <p className="open-time">6:00 - 21:00</p>
                <div className="rating-container">
                    <img src='./img/fillstar-icon.png' alt="" />
                    <img src="./img/fillstar-icon.png" alt="" />
                    <img src="./img/unfillstar-icon.png" alt="" />
                    <img src="./img/unfillstar-icon.png" alt="" />
                    <img src="./img/unfillstar-icon.png" alt="" />
                </div>
            </div>
            <div className="infomation-icon">
                <button className='btn-i-icon'>i</button>
            </div>
        </div>

    </div>
  )
}

export default RestaurantDetail