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
    const accId = useSelector((state)=>state.user.account.userId);
    
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)


    useLayoutEffect(()=>{
      const getAllPosts = async() =>{
        let response = await fetchPost(accId,page,2);
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
            loader={<p>loading...</p>}
            fetchMore={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            endMessage={<p>You have seen it all</p>}>
                  {posts.map((post,index)=>
                    (post.account.id==accId? <Post key={index} post={post} isMyPost={true}/> : <Post key={index} post={post} isMyPost={false}/>)
                  )}
            </InfiniteScroll>
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

export default HomePage