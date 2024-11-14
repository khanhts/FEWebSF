import './home.css'
import React from 'react'
import Post from '../../../components/post/Post'
import Searchbar from '../../../components/searchbar/Searchbar'
import Ads from '../../../components/ads/Ads'
import Sidebar from '../../../components/sidebar/Sidebar'
import Quickview from '../../../components/quickview/Quickview'

const Home = () => {
  return (
    <>
        <div className='main-content'>
            <h2 className='home-title'>New feed</h2>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
        </div>
        <div className="rightbar">
            <Searchbar/>
            <Ads/>
            <Sidebar/>
            <Quickview/>    
        </div>
    </>
    
  )
}

export default Home