import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IMG_BASE_URL } from '../../../../utils/const/UrlConst';
import { customDateParse } from '../../../../utils/customDateParse';
import { createPost } from '../../../../services/axios/AxiosPost';
import { useLocation, useNavigate } from 'react-router-dom';
import './editpost.css'

const EditPost = () => {
    const dialogRef = useRef(null);
    const location = useLocation();
    
    const account = useSelector((state)=>state.user.account);
    const post = location.state;

    const [limit, setLimit] = useState(4-post.images.length);
    const [content, setContent] = useState('');
    const [deletedImg, setDeletedImg] = useState([]);
    const [images, setImages] = useState([]);
    const [isShown, setIsShown] = useState(false);

    const navigate = useNavigate()


    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
        setContent(e.target.value);
    }

    const handleImagesUpload = (files) =>{
        setImages([...images, ... files])
    }

    const handleCreateFormSubmit = async(e) => {
        e.preventDefault();
        let response = await createPost(account.userId,content,null,null,images,account.accessToken);
        navigate('/')
    }

    const handleDeleteClick = () =>{
        setIsShown(true)
    }

    const handleNoClick = () =>{
        setIsShown(false)
    }

    useEffect(()=>{
    },[images])

    return (
        <>
            <dialog className='img-delete-confirmation' ref={dialogRef}>
                <p>Are you sure you want to delete this images?</p>
                <div className="confirmation">
                    <button className='btn-no' onClick={()=>handleNoClick()}>No</button>
                    <button className='btn-yes'>Yes</button>    
                </div>
            </dialog>
            <div className='main-content'>
            <div className="post-container">
                <div className="top-info">
                    <div className="user-info">
                        <img src={IMG_BASE_URL + account.avatar} alt="N/A" />
                        <ul>
                            <li>{account.fullname}</li>
                            <li>{customDateParse(Date.now())}</li>
                        </ul>    
                    </div>
                </div>
                <div className="create-form-container" >
                    <form onSubmit={async(e)=>handleCreateFormSubmit(e)}>
                        <textarea className='creat-post-content' name="content" placeholder='What are your thought?'
                                    onChange={(e)=>{handleKeyDown(e)}} defaultValue={post.description}></textarea>
                        <div className="images-origin">
                            {post.images.length>0? 
                                post.images.map((image, index)=>
                                <div key={index} className='imgprev-wrapper'>
                                    <img className='img-upload' src={IMG_BASE_URL + image.url_image}/>
                                    <button key={image.id} type='button' className='btn-remove-img' onClick={()=>dialogRef.current?.showModal()}>X</button>
                                </div>
                                            )
                                :
                                <></>
                            }
                        </div>
                        <input className='image-upload' type="file" multiple
                                onChange={(e)=>{handleImagesUpload(e.target.files)}}/>
                        <p>Upload Images:</p>
                        <div className="images-upload-preview">
                            {images.length>0? 
                                images.map((image, index)=>
                                            <img className='img-upload' key={index} src={URL.createObjectURL(image)}/>
                                            )
                                :
                                <></>
                            }
                        </div>
                        <div className="create-form-buttons">
                            <button className='btn-cancel'>Cancel</button>
                            <button type='submit' className='btn-post'>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditPost