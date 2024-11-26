import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import { customDateParse } from '../../utils/customDateParse'
import { NavLink, useNavigate } from "react-router-dom";
import './post.css'
import React, { useState } from 'react'
import { useRef } from 'react';
import { deletePost } from '../../services/axios/AxiosPost';
import { useSelector } from 'react-redux';

const Post = ({post, isMyPost}) => {
        const dialogRef = useRef(null);
        const navigate = useNavigate();
        const token = useSelector((state)=>state.user.account.accessToken);

        const [isShown, setIsShown] = useState(false);
        const [spin, setSpin] = useState(false)
        const [dltPost, setDltPost] = useState(0);
        const [postFocus, setPostFocus] = useState(true);

        const handlePostClicked = () => {
            if(postFocus)
                navigate('/post/detail', {state: {post,isMyPost}})
        }

        const handleOptIconClicked = (e) => {
            if(isShown)
                setIsShown(false)
            else
                setIsShown(true)
        }

        const handlePostHover = () => {
            if(!spin)
                setSpin(true)
        }

        const handleMouseOffPost = () => {
            setSpin(false)
        }

        const handleMouseOver = () => {
            setPostFocus(false);
        }

        const handleMouseLeave = () => {
            setPostFocus(true);
        }

        const handleDeleteClick = (value) => {
            setDltPost(value);
            dialogRef.current?.showModal();
        }

        const handleConfirmDeletePost = async() =>{
            await deletePost(dltPost, token);
            dialogRef.current?.close();
            window.location.reload();
        }

        return (
        <>
        <dialog className='img-delete-confirmation' ref={dialogRef}>
                <p>Are you sure you want to delete this post?</p>
                <div className="confirmation">
                    <button className='btn-no' onClick={()=>dialogRef.current?.close()}>No</button>
                    <button className='btn-yes' onClick={async()=>handleConfirmDeletePost()}>Yes</button>    
                </div>
        </dialog>
         {/* <div className={spin? "post-container spin": "post-container"} 
             onMouseEnter={()=>handlePostHover()} 
             onMouseLeave={()=>handleMouseOffPost()}> */}
        <div className="post-container" onClick={()=>handlePostClicked()}>
            <div className="top-info">
                <div className="user-info">
                    <img src={IMG_BASE_URL + post.account.url_avatar} alt="N/A" />
                    <ul>
                        <li>{post.account.fullname}</li>
                        <li>{customDateParse(post.created_at)}</li>
                    </ul>  
                </div>
                <div className='option' onMouseEnter={()=>handleMouseOver()} onMouseLeave={()=>handleMouseLeave()}>
                    <div className={isShown? 'option-icon active': 'option-icon'} 
                    onClick={(e)=>handleOptIconClicked(e.target)}>
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
                    { Object.hasOwn(post, "images")?
                    post.images.map((image, index)=><img key={index} className='post-img' src={IMG_BASE_URL+image.url_image} alt=''/>)
                    :
                    Object.hasOwn(post, "image")?
                    post.image.url_image!==''?
                    <img src={IMG_BASE_URL + post.image.url_image}/>:<></>
                    :
                    <></>
                    }
                </div>
            </div>
            <div className="like-comment">
                <button className='btn-like'
                onMouseEnter={()=>handleMouseOver()}
                onMouseLeave={()=>handleMouseLeave()}>{post.total_like} Like</button>
                <button className="btn-comment">{post.total_comment} Comments</button>
            </div>
        </div>
        </>
        )
}

export default Post