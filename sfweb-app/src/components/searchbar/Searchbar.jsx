import './searchbar.css'
import React from 'react'

function Searchbar() {
  return (
    <div className="searchbar-container">
        <input className="search-input" type="text" placeholder="Search ..."/>
        <button className="search-button" type="submit"><img src="" alt="" /></button>
    </div>
  )
}

export default Searchbar