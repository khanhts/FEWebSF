import './homepage.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Post from '../../../components/post/Post'
import Searchbar from '../../../components/searchbar/Searchbar'
import Ads from '../../../components/ads/Ads'
import Sidebar from '../../../components/sidebar/Sidebar'
import Quickview from '../../../components/quickview/Quickview'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../../../services/axios/AxiosPost'
import InfiniteScroll from '../../../components/infinitescroll/InfiniteScroll'

const HomePage = () => {
    const myAcc = useSelector((state)=>state.user.accounts);
    const accessToken = useSelector((state)=>state.auth.accessToken);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useLayoutEffect(()=>{
      const getAllPosts = async() =>{
        let response = await fetchPost(myAcc[0].id,page,2);
        if(response&&response.data.code>=200&&response.data.code<=300)
        {
          if(response.data.data == null)
            setHasMore(false)
          else
          {setPosts([...posts, ... response.data.data]);
            setHasMore(true)}
        }
      }
      getAllPosts(); 
    },[page]);
    return (
    <>
        <div className='main-content'>
            <h2 className='home-title'>New feed</h2> 
            <InfiniteScroll 
            loader={<div className='loader'><img className='loading-icon' src='../img/loading-icon.png'/></div> }
            fetchMore={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            endMessage={<p>You have seen it all</p>}>
                  {posts.map((post)=>
                    (post.account.id==myAcc[0].id? <Post key={post.id} post={post} isMyPost={true} myAcc={myAcc[0]} accessToken={accessToken}/> : <Post key={post.id} post={post} isMyPost={false} myAcc={myAcc[0]} accessToken={accessToken}/>)
                  )}
            </InfiniteScroll>
        </div>
        <div className="rightbar">
          <div className="rightbar-wrapper">
            <Searchbar myAcc={myAcc[0]} accessToken={accessToken}/>
            {/* <Ads/>
            <Sidebar/>  
            <Quickview/>    */}
          </div>
        </div>
    </>
    )
}

export default HomePage