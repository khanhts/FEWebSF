import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchProfilePosts } from '../../../services/axios/AxiosPost';
import Post from '../../post/Post';
import InfiniteScroll from '../../infinitescroll/InfiniteScroll';

const UserPost = () => {
  const location = useLocation();
  const params = useParams();
  const myAcc = location.state.myAcc;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getUserPosts = async() =>{
    let response = await fetchProfilePosts(myAcc.id, parseInt(params.accountID), page, 5)
    if(response.data.code>=200&&response.data.code<=300)
    {
      if(response.data.data == null)
        setHasMore(false)
      else
      {
        setPosts([...posts, ... response.data.data]);
        setHasMore(true)
      }
    }
      
  }

  useEffect(()=>{
    setPosts([]);
    setPage(1)
  },[params.accountID])

  useEffect(()=>{
    getUserPosts();
  },[page]);

  return (
    <>
      <InfiniteScroll 
            loader={<div className='loader'><img className='loading-icon' src='../img/loading-icon.png'/></div> }
            fetchMore={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            endMessage={<p>You have seen it all</p>}>
                  {posts.map((post)=>
                    (post.account.id==myAcc.id? <Post key={post.id} post={post} isMyPost={true} myAcc={myAcc}/> : <Post key={post.id} post={post} isMyPost={false} myAcc={myAcc}/>)
                  )}
      </InfiniteScroll>
    </>
  )
}

export default UserPost