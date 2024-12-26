import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./navdropdown.css"

const NavDropDown = ({title=null, items=null, links=null, avatar=null}) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseHover = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
    }

    return (
        <div className={isHover? "nav-dropdown drop":"nav-dropdown"} onMouseEnter={()=>handleMouseHover()} onMouseLeave={()=>handleMouseLeave()}>
            {title && <NavLink className="admin-nav-item" to={"/admin/"+title.toLowerCase()}>{title}</NavLink>}
            {avatar && <img className='admin-avatar' src={avatar} alt='avatar'/>}

           { (links || items) &&
            <div className="dropdown-container">
                {links && links.map((link, index)=>(<NavLink key={index} to={(link.replace(/\s/g, "-")).toLowerCase()}>{link}</NavLink>))}
                {items && items}
            </div>}
        </div>
    )
}

export default NavDropDown