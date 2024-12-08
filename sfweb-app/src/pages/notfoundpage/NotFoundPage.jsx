import React from 'react'
import './notfoundpage.css'
import { NavLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='errorpage-container'>
        <h1>404 NOT FOUND</h1>
        <NavLink to='/'>Return to homepage</NavLink>
    </div>
  )
}

export default NotFoundPage