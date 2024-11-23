import React, { useEffect, useState } from 'react'
import './createpost.css'
import { useSelector } from 'react-redux'
import { IMG_BASE_URL } from '../../../../utils/const/UrlConst';
import { customDateParse } from '../../../../utils/customDateParse';
import { createPost } from '../../../../services/axios/AxiosPost';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const account = useSelector((state)=>state.user.account);
    

    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

    const navigate = useNavigate()

    const handleKeyDown = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
        setContent(e.target.value);
    }

    const handleImagesUpload = (files) =>{
        setImages([... files])
    }

    const handleCancleEdit = () => {
        navigate('/');
    }

    const handleCreateFormSubmit = async(e) => {
        e.preventDefault();
        let response = await createPost(account.userId,content,null,null,images,account.accessToken);
        navigate('/')
    }

    useEffect(()=>{
    },[images])

    return (
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
                                    onChange={(e)=>{handleKeyDown(e)}}></textarea>
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
                            <button type='button' className='btn-cancel' onClick={()=>handleCancleEdit()}>Cancel</button>
                            <button type='submit' className='btn-post'>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost