import './restaurantcard.css'

import React from 'react'

const RestaurantCard = () => {
  return (
    <div className='restaurant-container'>
        <div className="card-image">
            <img src="" alt="" />
        </div>
        <div className="restaurant-info">
            <h2 className="restaurant-name">Restaurant's Name</h2>
            <p className="restaurant-distant">0.2km</p>
            <div className="rating-container">
                <img src='./img/fillstar-icon.png' alt="" />
                <img src="./img/fillstar-icon.png" alt="" />
                <img src="./img/unfillstar-icon.png" alt="" />
                <img src="./img/unfillstar-icon.png" alt="" />
                <img src="./img/unfillstar-icon.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default RestaurantCard