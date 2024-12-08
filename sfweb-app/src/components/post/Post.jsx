import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import { customDateParse } from '../../utils/customDateParse'
import { NavLink, useNavigate } from "react-router-dom";
import './post.css'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useRef } from 'react';
import { deletePost } from '../../services/axios/AxiosPost';
import { useSelector } from 'react-redux';
import { createReact, deleteReact, updateReact } from '../../services/axios/AxiosReact';

const Post = ({post, isMyPost, myAcc, accessToken}) => {
        const dialogRef = useRef(null);
        const navigate = useNavigate();

        const [isShown, setIsShown] = useState(false);
        const [spin, setSpin] = useState(false)
        const [dltPost, setDltPost] = useState(0);
        const [postFocus, setPostFocus] = useState(true);
        const [animated, setAnimated] = useState(false);
        const [showed, setShowed] = useState(false)
        const [reactIcon, setReactIcon] = useState('');
        const [reactState, setReactState] = useState(0);
        const [reactCount, setReactCount] = useState(0);

        const handlePostClicked = () => {
            if(postFocus)
                navigate('/post/detail', {state: {post,isMyPost,myAcc,accessToken}})
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

        const renderReactionIcon = (state) =>{
            switch(state)
            {
                case 1:
                    setReactIcon('../img/thumb-up-icon.png');
                    break;
                case 2:
                    setReactIcon('../img/fire-emoji.png');
                    break;
                case 3:
                    setReactIcon('../img/laugh-emoji.png');
                    break;
                case 4:
                    setReactIcon('../img/sad-face-emoji.png');
                    break;
                case 5:
                    setReactIcon('../img/dislike-icon.png');
                    break;
                default:
                    setReactIcon('../img/like-inactive-icon.png');
                
            }
            setReactState(state);
        }

        const showEmotesContainer = (e) => {
            if(e.target.getAttribute('class')==='btn-like')
                setAnimated(true);
            setShowed(true);
            setPostFocus(false);
        }
        
        const closeEmotesContainer = (e) => {
            if(e.target.getAttribute('class')==='btn-like')
                setAnimated(false);
            setShowed(false);
            setPostFocus(true);
        }

        const handleReactClicked = async(value) => {
            console.log("Processing ...");
            console.log("Current state: ", reactState);
            console.log("New state: ", value);
            let response;
            if(value==reactState&&reactState!=0)
            {
                console.log("Deleting ...")
                response = await deleteReact(myAcc.id,post.id,accessToken);
                if(response.data.code>=200&&response.data.code<=300)
                {
                    renderReactionIcon(0);
                    setReactCount(reactCount-1);
                }
            }
            else if(reactState==0)
            {
                if(value==0)
                {
                    value=1;
                }
                console.log("Creating ...")
                response = await createReact(myAcc.id,post.id,value,accessToken);
                if(response.data.code>=200&&response.data.code<=300){
                    renderReactionIcon(value);
                    setReactCount(reactCount+1);
                }
            }
            else{
                console.log("Updating ...");
                response = await updateReact(myAcc.id,post.id,value,accessToken)
                if(response.data.code>=200&&response.data.code<=300)
                    renderReactionIcon(value);
            }
            console.log("Finish: ", response)
        }

        const handleDeleteClick = (value) => {
            setDltPost(value);
            dialogRef.current?.showModal();
        }

        const handleConfirmDeletePost = async() =>{
            await deletePost(dltPost, accessToken);
            dialogRef.current?.close();
            window.location.reload();
        }

        useEffect(()=>{
            if(post.post_type_id!=9)
            {
                renderReactionIcon(parseInt(post.react_state.state));
                setReactCount(post.total_like);
            }
        },[])

        return (
        <>
        <dialog className='delete-dialog' ref={dialogRef}>
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
                        <li onMouseEnter={()=>handleMouseOver()} onMouseLeave={()=>handleMouseLeave()}><NavLink to={`profile/${post.account.id}`} state={{myAcc: myAcc, accessToken: accessToken}}>{post.account.fullname}</NavLink></li>
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
                            <NavLink className='link-opt-name' to={{pathname: `/post/edit`}} state={{post,myAcc,accessToken}}>Edit</NavLink>
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
                    {
                        post.images.length>0?
                        post.images.slice(0,4).map((image, index)=>
                                                    index==3?
                                                    <div key={image.id} className='more-image'>
                                                        <img className='post-img' src={IMG_BASE_URL+image.url_image}/>
                                                        <button className='btn-img-more'>+</button>
                                                    </div>
                                                    :
                                                    <img key={image.id} className='post-img' src={IMG_BASE_URL+image.url_image}/>)
                        :
                        <></>
                    }
                </div>
            </div>
            {post.post_type_id!=9?
            <div className="like-comment">
                <div className={showed?"emotes-container showed":"emotes-container"} onMouseEnter={(e)=>showEmotesContainer(e)} onMouseLeave={(e)=>closeEmotesContainer(e)}>
                    <img react-state={1} src="../img/thumb-up-icon.png" alt="N/A"  onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}/>
                    <img react-state={2} src="../img/fire-emoji.png" alt="N/A"  onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}/>
                    <img react-state={3} src="../img/laugh-emoji.png" alt="N/A" onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}/>
                    <img react-state={4} src="../img/sad-face-emoji.png" alt="N/A" onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}/>
                    <img react-state={5} src="../img/dislike-icon.png" alt="N/A" onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}/>
                </div>
                <button react-state={reactState} className={'btn-like'}
                onMouseEnter={(e)=>showEmotesContainer(e)}
                onMouseLeave={(e)=>closeEmotesContainer(e)}
                onClick={(e)=>handleReactClicked(parseInt(e.target.getAttribute('react-state')))}>
                    <span>{reactCount}  </span>
                    <img react-state={reactState} className={animated? 'react-icon animated':'react-icon'} 
                        src={reactIcon}/>
                </button>
                <button className="btn-comment">{post.total_comment} Comments</button>
            </div>
            :
            <></>
            }
        </div>
        </>
        )
}

export default Post