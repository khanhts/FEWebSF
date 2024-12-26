import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const RestaurantCreate = () => {

    const params = useParams();
  
    const [fullname, setFullname] = useState("");
    const [language, setLanguage] = useState("");
    const [avatar, setAvatar] = useState("");
    const [background, setBackground] = useState("");

    return (
        <div className='main-content'>
            <div className="form-container">
                <form>
                    
                </form>
            </div>
        </div>
    )
}

export default RestaurantCreate