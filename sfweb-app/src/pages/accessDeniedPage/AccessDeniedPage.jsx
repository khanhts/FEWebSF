import React from 'react'
import { NavLink } from 'react-router-dom'
import './accessdeniedpage.css'

const AccessDeniedPage = () => {
  return (
    <div className='access-denied-container'>
        <h1>Access Denied</h1>
        <NavLink to='/registration'>Return to login</NavLink>
    </div>
  )
}

export default AccessDeniedPage