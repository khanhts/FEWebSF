import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { searchUsers } from '../../../services/axios/AxiosUser';
import UserCard from '../../../components/usercard/UserCard';
import Searchbar from '../../../components/searchbar/Searchbar';

const SearchedUser = () => {
    const params = useParams();
    const location = useLocation();

    const [searchedUsers, setSearchedUsers] = useState([]);

    const findUserByFullname = async() => {
        const response = await searchUsers(params.query, 1, 5, location.state.accessToken);
        console.log("Search result: ", response);
        setSearchedUsers([...searchedUsers, ...response.data.data]);
      }

    useEffect(()=>{
        findUserByFullname()
    },[])
    
    return (
    <div className='main-content'>
        <Searchbar accessToken={location.state.accessToken}></Searchbar>
        {searchedUsers.map((account)=>{
            return (<UserCard key={account.id} account={account} myAcc={location.state.myAcc} accessToken={location.state.accessToken}/>)})}
    </div>
    )
}

export default SearchedUser