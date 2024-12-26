import React, { useState } from 'react'
import '../modal.css'
import PriceCard from '../../pricecard/PriceCard'

export const ModalUpgrade = ({closeModal, handleMouseHover, handleMouseLeave,myAcc}) => {

  return (
    <>
        <div className="modal-upgrade-container" onClick={()=>closeModal()}>
            <div className="modal-upgrade-box" onMouseEnter={()=>handleMouseHover()} onMouseLeave={()=>handleMouseLeave()}>
              <PriceCard myAcc={myAcc}/>
            </div>
        </div>
    </>
  )
}