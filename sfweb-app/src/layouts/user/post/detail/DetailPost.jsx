import React, { useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { deletePost } from '../../../../services/axios/AxiosPost';
import { IMG_BASE_URL } from '../../../../utils/const/UrlConst';
import { customDateParse } from '../../../../utils/customDateParse';
import './detailpost.css'
import { createComment, fetchComments } from '../../../../services/axios/AxiosComment';
import Post from '../../../../components/post/Post';
import InfiniteScroll from '../../../../components/infinitescroll/InfiniteScroll';
import { useSelector } from 'react-redux';
import Comment from '../../../../components/comment/Comment';

const DetailPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const myAcc = location.state.myAcc;
    const accessToken = location.state.accessToken;
    const post = location.state.post;
    const isMyPost = location.state.isMyPost;

    const [comments, setComment] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)


    const handleGoBackClicked = () => {
        navigate('/');
    }

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        setContent(e.target.value);
    }

    const handleImageUpload = (file) => {
        setImage(file)
    }

    const handleCommentFormSubmit = async(e) => {
        e.preventDefault();
        console.log("Creating comment ...");
        let response = await createComment(post.id,content, myAcc.id, image, accessToken);
        if(response&&response.data.code>=200&&response.data.code<=300)
        {
            setContent('');
            setImage(null);
            window.location.reload();
        }
    }

    useLayoutEffect(()=>{
    const getAllComments = async() =>{
        let response = await fetchComments(post.id,page,5,accessToken);
        console.log(response);
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
        <div className="main-content">
            <div className="page-title">
                <button type='button' className='btn-goback' onClick={()=>handleGoBackClicked()}>{"<"}</button>
                <h2 className='title-label'>Post</h2>
            </div>
            <Post post={post} isMyPost={isMyPost} myAcc={myAcc}></Post>
            <div className="comment-section">
                <h3>Comment:</h3>
                <form className='comment-form' onSubmit={async(e)=>handleCommentFormSubmit(e)}>
                    <textarea className='creat-post-content' name="content" placeholder='What are your thought?' defaultValue={content}
                                        onChange={(e)=>{handleKeyDown(e)}}></textarea>
                    <div className="images-upload-preview">
                            {image!=null? 
                                <img className='comment-prev-img' src={URL.createObjectURL(image[0])}/>
                                :
                                <></>
                            }
                        </div>
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
                    {comments.map((comment)=>
                        (comment.account_id==myAcc.id? 
                            <Comment key={comment.id} comment={comment} isMyComment={true} myAcc={myAcc} accessToken={accessToken}/> 
                            : 
                            <Comment key={comment.id} comment={comment} isMyComment={false} myAcc={myAcc} accessToken={accessToken}/>)
                    )}
                </InfiniteScroll>
            </div>
        </div>
        </>
  )
}

export default DetailPost