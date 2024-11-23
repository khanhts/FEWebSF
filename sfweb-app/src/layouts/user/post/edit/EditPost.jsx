import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IMG_BASE_URL } from '../../../../utils/const/UrlConst';
import { customDateParse } from '../../../../utils/customDateParse';
import { createPost, deleteImage, editPost } from '../../../../services/axios/AxiosPost';
import { useLocation, useNavigate } from 'react-router-dom';
import './editpost.css'

const EditPost = () => {
    const dialogRef = useRef(null);
    const location = useLocation();
    
    const account = useSelector((state)=>state.user.account);
    const post = location.state;

    const [limit, setLimit] = useState(4-post.images.length);
    const [content, setContent] = useState(post.description);
    // const [pendingDelete, setPendingDelete] = useState(0);
    let peddingImg = 0;
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

    const handleEditFormSubmit = async(e) => {
        e.preventDefault();
        console.log("Start fetching ...")
        let response;
        if(deletedImg.length>0)
        {
            deletedImg.map(async(imgID)=>{
                response = await deleteImage(imgID, account.accessToken)
                console.log("Delete response: ", response)
            })
        }
        if(content!==post.description||images.length>0)
        {
             response = await editPost(account.userId, post.id,content,images,account.accessToken);
            console.log("Update response: ",response)
        }
        navigate('/')
    }

    const handleDeleteClicked = (index) => {
        peddingImg = post.images[index].id;
        dialogRef.current?.showModal();
    }

    const handleDeleteImage = () =>{
        setDeletedImg([...deletedImg, peddingImg])
        peddingImg = 0;
        dialogRef.current?.close();
    }

    useEffect(()=>{
    },[images])

    return (
        <>
            <dialog className='img-delete-confirmation' ref={dialogRef}>
                <p>Are you sure you want to delete this images?</p>
                <div className="confirmation">
                    <button className='btn-no' onClick={()=>dialogRef.current?.close()}>No</button>
                    <button className='btn-yes' onClick={()=>handleDeleteImage()}>Yes</button>    
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
                    <form onSubmit={async(e)=>handleEditFormSubmit(e)}>
                        <textarea className='creat-post-content' name="content" placeholder='What are your thought?'
                                    onChange={(e)=>{handleKeyDown(e)}} defaultValue={post.description}></textarea>
                        <div className="images-origin">
                            {post.images.length>0? 
                                post.images.map((image, index)=>
                                {
                                    if(!deletedImg.includes(image.id))
                                        return(
                                            <div key={index+1} className='imgprev-wrapper'>
                                            <img className='img-upload' src={IMG_BASE_URL + image.url_image}/>
                                            <button data-key={index} type='button' className='btn-remove-img' onClick={(e)=>handleDeleteClicked(e.target.getAttribute("data-key"))}>X</button>
                                        </div>)
                                }
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
                            <button type='button' className='btn-cancel'>Cancel</button>
                            <button type='submit' className='btn-post' disabled={content!==post.description?false:
                                                                        (images.length>0?false:
                                                                        (deletedImg.length>0? false: true))}>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditPost