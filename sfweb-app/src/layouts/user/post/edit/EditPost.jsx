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
    
    const post = location.state.post;
    const myAcc = location.state.myAcc;
    const accessToken = location.state.accessToken;

    let peddingImg = 0;

    const [content, setContent] = useState(post.description);
    const [deletedImg, setDeletedImg] = useState([]);
    const [images, setImages] = useState([]);

    const navigate = useNavigate()


    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
        setContent(e.target.value);
    }

    const handleImagesUpload = (files) =>{
        setImages([...files])
    }

    const handleCancleEdit = () => {
        navigate('/');
    }

    const handleEditFormSubmit = async(e) => {
        e.preventDefault();
        // console.log("Start fetching ...")
        let response;
        if(deletedImg.length>0)
        {
            deletedImg.map(async(imgID)=>{
                response = await deleteImage(imgID, accessToken)
                // console.log("Delete response: ", response)
            })
        }
        if(content!==post.description||images.length>0)
        {
            response = await editPost(myAcc.id, post.id,content,images,accessToken);
            // console.log("Update response: ",response)
        }
        navigate('/')
    }

    const handleDeleteClicked = (imgId) => {
        if(post.post_type_id==9)
            peddingImg = post.image.id;
        else
        {
            for(let i=0;i<post.images.length;i++)
                if(post.images[i].id==imgId)
                    peddingImg=post.images[i].id;
        }
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
            <dialog className='delete-dialog' ref={dialogRef}>
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
                        <img src={IMG_BASE_URL + myAcc.url_avatar} alt="N/A" />
                        <ul>
                            <li>{myAcc.fullname}</li>
                            <li>{customDateParse(Date.now())}</li>
                        </ul>    
                    </div>
                </div>
                <div className="create-form-container" >
                    <form onSubmit={async(e)=>handleEditFormSubmit(e)}>
                        <textarea className='creat-post-content' name="content" placeholder='What are your thought?'
                                    onChange={(e)=>{handleKeyDown(e)}} defaultValue={post.description}></textarea>
                        <div className="pImg-container">
                            {
                                Object.hasOwn(post,"images")?
                                (post.images.length>0? 
                                    post.images.map((image)=>
                                    {
                                        if(!deletedImg.includes(image.id))
                                            return(
                                                <div className='imgprev-wrapper'>
                                                <img className='post-img' src={IMG_BASE_URL + image.url_image}/>
                                                <button data-key={image.id} type='button' className='btn-remove-img' onClick={(e)=>handleDeleteClicked(e.target.getAttribute("data-key"))}>X</button>
                                            </div>)
                                    }
                                    )
                                    :
                                    <></>)
                                :
                                Object.hasOwn(post,"image")?
                                (!deletedImg.includes(post.image.id)?
                                    <div className='imgprev-wrapper'>
                                        <img className='post-img' src={IMG_BASE_URL + post.image.url_image}/>
                                        <button data-key={post.image.id} type='button' className='btn-remove-img' onClick={(e)=>handleDeleteClicked(e.target.getAttribute("data-key"))}>X</button>
                                    </div>
                                :
                                <></>)
                                :
                                <></>
                            }
                        </div>
                        <label className='lbl-imgUp' htmlFor='imageUpload'><img src='../img/imgUp-icon.png'/></label>
                        <input className='image-upload' type="file" id='imageUpload' multiple
                                onChange={(e)=>{handleImagesUpload(e.target.files)}}/>
                        <div className="pImg-container">
                            {images.length>0? 
                                images.slice(0,2).map((image, index)=>
                                    index==1?
                                    <div key={image.id} className='more-image'>
                                        <img className='post-img' key={index} src={URL.createObjectURL(image)}/>
                                        <button className='btn-img-more'>+</button>
                                    </div>
                                    :
                                    <img className='post-img' key={index} src={URL.createObjectURL(image)}/>
                                )
                                :
                                <></>
                            }
                        </div>
                        <div className="create-form-buttons">
                            <button type='button' className='btn-cancel' onClick={()=>handleCancleEdit()}>Cancel</button>
                            <button type='submit' className='btn-post' disabled={content!==post.description?false:
                                                                        (images.length>0?false:
                                                                        (deletedImg.length>0? false: true))}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditPost