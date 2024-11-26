import React, { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { deletePost } from '../../../../services/axios/AxiosPost';
import { IMG_BASE_URL } from '../../../../utils/const/UrlConst';
import { customDateParse } from '../../../../utils/customDateParse';
import './detailpost.css'
import { fetchComments } from '../../../../services/axios/AxiosComment';
import Post from '../../../../components/post/Post';
import InfiniteScroll from '../../../../components/infinitescroll/InfiniteScroll';
import { useSelector } from 'react-redux';

const DetailPost = () => {
    const navigate = useNavigate();
    const dialogRef = useRef(null);
    const location = useLocation();
    const token = useSelector((state)=>state.user.account.accessToken);

    const post = location.state.post;
    const isMyPost = location.state.isMyPost;

    const [isShown, setIsShown] = useState(false);
    const [dltPost, setDltPost] = useState(0);
    const [comments, setComment] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [content, setContent] = useState('')
    const [image, setImage] = useState([])


    const handleGoBackClicked = () => {
        navigate('/');
    }

    const handleOptIconClicked = (e) => {
        if(isShown)
            setIsShown(false)
        else
            setIsShown(true)
    }

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        setContent(e.target.value);
    }

    const handleImageUpload = (file) => {
        setImage(file)
    }

    const handleDeleteClick = (value) => {
        setDltPost(value);
        dialogRef.current?.showModal();
    }

    const handleConfirmDeletePost = async() =>{
        console.log("token: ", token);
        console.log("Start fetching ...");
        await deletePost(dltPost, token);
        dialogRef.current?.close();
        navigate('/');
    }

    useLayoutEffect(()=>{
    const getAllComments = async() =>{
        let response = await fetchComments(post.id,page,2,token);
        if(response&&response.data.code>=200&&response.data.code<=300)
        {
        if(response.data.data == null)
            setHasMore(false)
        else
        {
            setComment([...comments, ... response.data.data]);
            setHasMore(true)}
        }
    }
    getAllComments(); 
    },[page]);

  return (
    <>
        <dialog className='img-delete-confirmation' ref={dialogRef}>
                <p>Are you sure you want to delete this post?</p>
                <div className="confirmation">
                    <button className='btn-no' onClick={()=>dialogRef.current?.close()}>No</button>
                    <button className='btn-yes' onClick={async()=>handleConfirmDeletePost()}>Yes</button>    
                </div>
        </dialog>
        <div className="main-content">
            <div className="page-title">
                <button type='button' className='btn-goback' onClick={()=>handleGoBackClicked()}>{"<"}</button>
                <h2 className='title-label'>Post</h2>
            </div>
            <div className="post-container">
                <div className="top-info">
                    <div className="user-info">
                        <img src={IMG_BASE_URL + post.account.url_avatar} alt="N/A" />
                        <ul>
                            <li>{post.account.fullname}</li>
                            <li>{customDateParse(post.created_at)}</li>
                        </ul>  
                    </div>
                    <div className='option'>
                        <div className={isShown? 'option-icon active': 'option-icon'} onClick={(e)=>handleOptIconClicked(e.target)}>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                        </div>
                        <div className={isShown? "options-label active":"options-label"}>
                            {isMyPost?
                            <>
                                <NavLink className='link-opt-name' to={{pathname: `/post/edit`}} state={post}>Edit</NavLink>
                                <button data-key={post.id} className='btn-opt-name' onClick={(e)=>handleDeleteClick(e.target.getAttribute("data-key"))}>Delete</button>
                            </>
                            :
                            <></>}
                            <button className='btn-opt-name' >Report</button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <div className="pImg-container">
                        {/* {post.images.map((image, index)=><img key={index} className='post-img' src={IMG_BASE_URL+image.url_image} alt=''/>)} */}
                        { Object.hasOwn(post, "images")?
                    post.images.map((image, index)=><img key={index} className='post-img' src={IMG_BASE_URL+image.url_image} alt=''/>)
                    :
                    Object.hasOwn(post, "image")?
                    <image src={IMG_BASE_URL + post.image.url_image}/>
                    :
                    <></>
                    }
                    </div>
                </div>
                <div className="like-comment">
                    <button className='btn-like'>{post.total_comment} Like</button>
                    <button className="btn-comment" disabled={true}>{post.total_like} Comments</button>
                </div>
            </div>
            <div className="comment-section">
                <h3>Comment:</h3>
                <form className='comment-form'>
                    <textarea className='creat-post-content' name="content" placeholder='What are your thought?'
                                        onChange={(e)=>{handleKeyDown(e)}}></textarea>
                    <div className="comment-form-option">
                        <label className='lbl-imgUp' htmlFor='imageUpload'><img src='../img/imgUp-icon.png'/></label>
                        <button type='submit' className='btn-comment-submit'><img src="../img/post-icon.png"/></button>
                    </div>
                    <input id='imageUpload' className='image-upload' type="file" 
                            onChange={(e)=>{handleImageUpload(e.target.files)}}/>
                </form>
                <InfiniteScroll 
                loader={<p>loading...</p>}
                fetchMore={() => setPage((prev) => prev + 1)}
                hasMore={hasMore}
                endMessage={<p>You have seen it all</p>}>
                    {comments.map((comment,index)=>
                        (isMyPost? <Post key={index} post={comment} isMyPost={true}/> : <Post key={index} post={comment} isMyPost={false}/>)
                    )}
                </InfiniteScroll>
            </div>
        </div>
        </>
  )
}

export default DetailPost