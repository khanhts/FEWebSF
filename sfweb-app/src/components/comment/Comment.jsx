import React, { useRef, useState } from 'react'
import { IMG_BASE_URL } from '../../utils/const/UrlConst';
import { customDateParse } from '../../utils/customDateParse';
import { NavLink } from 'react-router-dom';
import { deleteComment, updateComment } from '../../services/axios/AxiosComment';

const Comment = ({comment, isMyComment, myAcc, accessToken}) => {
    const dialogRef = useRef(null);

    const [isShown, setIsShown] = useState(false);
    const [dltComment, setDltComment] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState('');

    const handleEditClicked = () => {
        setIsEditing(true);
    }

    const handleCancleEdit = () => {
        setIsEditing(false);
    }

    const handleOptIconClicked = (e) => {
        if(isShown)
            setIsShown(false)
        else
            setIsShown(true)
    }

    const handleDeleteClicked = (value) => {
        setDltComment(value);
        dialogRef.current?.showModal();
    }

    const handleConfirmDeletePost = async() =>{
        let response = await deleteComment(comment.id,accessToken)
        dialogRef.current?.close();
        window.location.reload();
    }

    const handleKeyDown = (e) => {
        setContent(e.target.value);
    }

    const handleEditFormSubmit = async(e) =>{
        e.preventDefault();
        const response = await updateComment(comment.id, content, null, accessToken)
        window.location.reload();
    }
    
    return (
    <>
        <dialog className='delete-dialog' ref={dialogRef}>
                <p>Are you sure you want to delete this post?</p>
                <div className="confirmation">
                    <button className='btn-no' onClick={()=>dialogRef.current?.close()}>No</button>
                    <button className='btn-yes' onClick={async()=>handleConfirmDeletePost()}>Yes</button>    
                </div>
        </dialog>
        <div className="post-container">
            <div className="top-info">
                <div className="user-info">
                    <img src={IMG_BASE_URL + comment.account.url_avatar} alt="N/A" />
                    <ul>
                        <li>{comment.account.fullname}</li>
                        <li>{customDateParse(comment.created_at)}</li>
                    </ul>  
                </div>
                <div className='option'>
                    <div className={isShown? 'option-icon active': 'option-icon'} 
                    onClick={(e)=>handleOptIconClicked(e.target)}>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                    <div className={isShown? "options-label active":"options-label"}>
                        {isMyComment?
                        <>
                            <button type='button' className='link-opt-name' onClick={()=>handleEditClicked()}>Edit</button>
                            <button type='button' data-key={comment.id} className='btn-opt-name' onClick={(e)=>handleDeleteClicked(e.target.getAttribute("data-key"))}>Delete</button>
                        </>
                        :
                        <></>}
                        <button className='btn-opt-name' >Report</button>
                    </div>
                </div>
            </div>
            <div className="content">
                {isEditing?
                <div className="create-form-container">
                    <form onSubmit={(e)=>handleEditFormSubmit(e)}>
                        <textarea className='creat-post-content' name="content" placeholder='What are your thought?'
                                        onChange={(e)=>{handleKeyDown(e)}} defaultValue={comment.description}></textarea>
                        <div className="create-form-buttons">
                            <button type='button' className='btn-cancel' onClick={()=>handleCancleEdit()}>Cancel</button>
                            <button type='submit' className='btn-post'>Save</button>
                        </div>
                    </form>
                </div>
                :
                <p>{comment.description}</p>
                }
                <div className="pImg-container">
                    {comment.image.url_image!==''?
                        <img className='post-img' src={IMG_BASE_URL + comment.image.url_image}/>
                    :
                    <></>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Comment