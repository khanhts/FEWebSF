import { IMG_BASE_URL } from '../../utils/const/UrlConst'
import { customDateParse } from '../../utils/customDateParse'
import './post.css'
import React, { useEffect, useState } from 'react'

const Post = ({post}) => {

        const [isShown, setIsShown] = useState(false);
        const [spin, setSpin] = useState(false) 

        const handleOptIconClicked = (e) => {
            if(isShown)
                setIsShown(false)
            else
                setIsShown(true)
        }

        const handlePostClicked = () => {
            if(!spin)
                setSpin(true)
        }

        const handleMouseOffPost = () => {
            setSpin(false)
        }

        return (
        <div className={spin? "post-container spin": "post-container"} onMouseEnter={()=>handlePostClicked()} onMouseLeave={()=>handleMouseOffPost()}>
        {/* <div className="post-container"> */}
            <div className="top-info">
                <div className="user-info">
                    <img src={IMG_BASE_URL + post.account.url_avatar} alt="N/A" />
                    <ul>
                        <li>{post.account.fullname}</li>
                        <li>{customDateParse(post.created_at)}</li>
                    </ul>    
                </div>
                <div className='option'>
                    <div className={isShown? "options-label active":"options-label"}>
                        <button className='btn-opt-name' onClick={(e)=>handleOptIconClicked(e.target)}>Edit</button>
                        <button className='btn-opt-name'onClick={(e)=>handleOptIconClicked(e.target)}>Delete</button>
                        <button className='btn-opt-name'onClick={(e)=>handleOptIconClicked(e.target)}>Report</button>
                    </div>
                    <div className='option-icon' onClick={(e)=>handleOptIconClicked(e.target)}>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                </div>
            </div>
            <div className="content">
                <p>{post.description}</p>
                <div className="pImg-container">
                    {post.images.map((image, index)=><img key={index} className='post-img' src={IMG_BASE_URL+image.url_image} alt=''/>)}
                </div>
            </div>
            <div className="like-comment">
                <button className='btn-like'>{post.total_comment} Like</button>
                <button className="btn-comment">{post.total_like} Comments</button>
            </div>
        </div>
        )
}

export default Post