import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchAllPrice } from '../../../services/axios/AxiosPrice';
import ModalCUPrice from '../../../components/modals/price/ModalCUPrice';
import './pricemanagement.css'
import PriceTag from '../../../components/pricetag/PriceTag';
const PriceManagement = () => {
    const location = useLocation();

    const [prices, setPrices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(true);
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    const initPriceList = async() => {
        const response = await fetchAllPrice(location.state);
        setPrices(response.data)
    }

    const handleMouseHover = () => {
        setIsFocus(false);
    }

    const handleMouseLeave = () => {
        setIsFocus(true);
    }

    const openModalCreatePrice = () => {
        setIsOpen(true);
    }

    const closeModalCreatePrice = () => {
        if(isFocus)
            setIsOpen(false);
    }

    const handleCheckAll = () => {
        setIsCheckedAll(true);
    }

    const handleUnCheckAll = () => {
        setIsCheckedAll(false);
    }

    useEffect(()=>{
        initPriceList();
    },[])

    return (
    <div className='body-container'>
        {isOpen && <ModalCUPrice    closeModal={closeModalCreatePrice} 
                                    handleMouseHover={handleMouseHover} 
                                    handleMouseLeave={handleMouseLeave} 
                                    context={"Create new"}
                                    token={location.state}/>}
        <div className="left-body">
            <button onClick={()=>openModalCreatePrice()}>Create new price tag</button>
            <button onClick={()=>handleCheckAll()}>Select all price tag</button>
            <button onClick={()=>handleUnCheckAll()}>Unselect all price tag</button>
        </div>
        <div className="middle-body">
            {prices && (
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Price</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map((priceTag)=>(
                            <PriceTag key={priceTag.id} priceTag={priceTag} isCheckedAll={isCheckedAll}/>
                        ))}
                    </tbody>
                </table>
                )}
        </div>
    </div>
    )
}

export default PriceManagement