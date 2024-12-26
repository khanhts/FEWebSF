import { useNavigateSearch } from '../../hook/useNavigateSearch';
import { searchUsers } from '../../services/axios/AxiosUser';
import './searchbar.css'
import React, { useLayoutEffect, useState } from 'react'

function Searchbar({myAcc}) {
  const navigateSearch = useNavigateSearch()

  const [searchChars, setSearchChars] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchChars(e.target.value)
  }

  const findUserByFullname = async(query) => {
    const response = await searchUsers(query, 1, 5);
    console.log("Search result: ", response);
    return response.data;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigateSearch(`/search/users`, {name: searchChars},myAcc);
  }

  useLayoutEffect(()=>{
    if(searchChars!="")
      findUserByFullname(searchChars);
  },[searchChars])

  return (
    <div className="searchbar-container">
      <form onSubmit={(e)=>handleSearchSubmit(e)}>
        <div className="searchbar-wrapper">
          <input className="search-input" type="text" placeholder="Search User" onChange={(e)=>handleSearchInputChange(e)}/>
          <button className="search-button" type="submit"><img src="/img/search-icon.png" alt="search-icon" /></button>
        </div>
      </form>
    </div>
  )
}

export default Searchbar