import './post.css'
import React from 'react'

const Post = () => {
  return (
    <div className="post-container">
        <div className="top-info">
            <div className="user-info">
                <img src="" alt="N/A" />
                <ul>
                    <li>Username</li>
                    <li>Date</li>
                </ul>    
            </div>
            <div className='option'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </div>
        </div>
        <div className="content">
            <p>This is peak content.</p>
        </div>
        <div className="like-comment">
            <button className='btn-like'>Like</button>
            <button className="btn-comment">Comments</button>
        </div>
    </div>
  )
}

export default Post