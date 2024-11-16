import React from 'react'
import './notfoundpage.css'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='errorpage-container'>
        <h1>404 NOT FOUND</h1>
        <Link to='/'>Return to homepage</Link>
    </div>
  )
}

export default NotFoundPage