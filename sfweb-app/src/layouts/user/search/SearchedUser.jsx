import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { searchUsers } from '../../../services/axios/AxiosUser';
import UserCard from '../../../components/usercard/UserCard';
import Searchbar from '../../../components/searchbar/Searchbar';

const SearchedUser = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [searchedUsers, setSearchedUsers] = useState([]);
    const [page, setPage] = useState(1);

    const findUserByFullname = async() => {        
        const response = await searchUsers(searchParams.get("name"), 1, 10);
        console.log("Search result: ", response);
        setSearchedUsers([...searchedUsers, ...response.data.data]);
      }

    useEffect(()=>{
        findUserByFullname()
    },[page])
    
    return (
        <div className='main-content'>
            <Searchbar myAcc={location.state}></Searchbar>
            {searchedUsers.map((account)=>{
                return (<UserCard key={account.id} account={account} myAcc={location.state}/>)})}
        </div>
    )
}

export default SearchedUser