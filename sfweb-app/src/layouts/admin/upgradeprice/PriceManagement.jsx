import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { fetchAllPrice } from '../../../services/axios/AxiosPrice';
import ModalCUPrice from '../../../components/modals/price/ModalCUPrice';
import './pricemanagement.css'
import PriceTag from '../../../components/pricetag/PriceTag';
const PriceManagement = () => {
    const [prices, setPrices] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(true);
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isUncheckedAll, setIsUncheckedAll] = useState(false);
    const [selectList, setSelectList] = useState([]);

    const handleSelect = (e) => {
        setSelectList((prevList)=>prevList.concat(e));
    }

    const handleDeselect = (e) => {
        setSelectList((prevList)=>prevList.filter(value => value!=e))
    }

    const showSelectList = () => {
        console.log("Select list: ",selectList);
        
    }
    

    const initPriceList = async() => {
        const response = await fetchAllPrice();
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
        setIsUncheckedAll(false);
        setIsCheckedAll(true);
    }

    const handleCancelCheckAll = () => {
        setIsCheckedAll(false);
    }

    const handleUnCheckAll = () => {
        setIsCheckedAll(false);
        setIsUncheckedAll(true);
    }

    const handleCancelUncheckAll = () => {
        setIsUncheckedAll(false);
    }

    useEffect(()=>{
        initPriceList();
    },[])

    return (
    <div className='body-container'>
        {isOpen && <ModalCUPrice    closeModal={closeModalCreatePrice} 
                                    handleMouseHover={handleMouseHover} 
                                    handleMouseLeave={handleMouseLeave} 
                                    context={"Create new"}/>}
        <div className="left-body">
            <p>Select: <span>{selectList.length}</span></p>
            <button onClick={()=>openModalCreatePrice()}>Create new price tag</button>
            <button onClick={()=>handleCheckAll()}>Select all price tag</button>
            <button onClick={()=>handleUnCheckAll()}>Unselect all price tag</button>
            <button onClick={()=>showSelectList()}>Show list</button>
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
                            <PriceTag   key={priceTag.id} 
                                        priceTag={priceTag} 
                                        isCheckedAll={isCheckedAll} 
                                        isUncheckedAll={isUncheckedAll}
                                        handleCancelCheckAll={handleCancelCheckAll}
                                        handleCancelUncheckAll={handleCancelUncheckAll}
                                        handleSelect={handleSelect}
                                        handleDeselect={handleDeselect}/>
                        ))}
                    </tbody>
                </table>
                )}
        </div>
    </div>
    )
}

export default PriceManagement