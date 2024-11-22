import RestaurantCard from '../../../components/restaurantcard/RestaurantCard'
import Restaurant from '../../../components/restaurantcard/RestaurantCard'
import Searchbar from '../../../components/searchbar/Searchbar'
import './queryrestaurant.css'

import React from 'react'

const QueryRestaurant = () => {
  return (
    <div className='main-content'>
        <Searchbar/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
    </div>
  )
}

export default QueryRestaurant