import Restaurant from '../../../components/restaurant/Restaurant'
import Searchbar from '../../../components/searchbar/Searchbar'
import './restaurantquery.css'

import React from 'react'

const RestaurantQuery = () => {
  return (
    <div className='main-content'>
        <Searchbar/>
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>
        <Restaurant/>
    </div>
  )
}

export default RestaurantQuery