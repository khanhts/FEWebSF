import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { createPriceTag } from '../../../services/axios/AxiosPrice';

const ModalCUPrice = ({closeModal, handleMouseHover, handleMouseLeave, context}) => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [benefits, setBenefits] = useState("");
  const [benefitCount, setBenefitCount] = useState([])

  const saveTitle = (e) => {
    setTitle(e.target.value)
  }

  const savePrice = (e) => {
    setPrice(e.target.value)
  }

  const saveBenefit = (e) => {
    setBenefits(e.target.value)
  }

  const handleMoreClicked = () => {
    if(benefitCount.length>4)
      return
    else if(benefitCount.length>0)
      setBenefitCount([...benefitCount, benefitCount.pop()+1]);
    else
      setBenefitCount([1])
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      price: parseFloat(price),
      benefit: benefits
    }

    const response = createPriceTag(formData)
  }

  return (
    <div className="modal-upgrade-container" onClick={()=>closeModal()}>
        <div className="modal-upgrade-box" onMouseEnter={()=>handleMouseHover()} onMouseLeave={()=>handleMouseLeave()}>
            <h2>{context} price tag</h2>
            <form onSubmit={(e)=>handleFormSubmit(e)}>
              <div className="form-wrapper">
                  <div className="form-group">
                    <label htmlFor="title">Enter price tag title</label>
                    <input type="text" name="title" onChange={(e)=>saveTitle(e)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Enter price value</label>
                    <input type="text" name="price" onChange={(e)=>savePrice(e)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="benefit">Enter benefits value</label>
                    <input type='text' name='benefit' onChange={(e)=>saveBenefit(e)}></input>
                    {benefitCount && benefitCount.map(benefit=>
                                                      <div>
                                                        <input type='text' name='benefit' id={benefit}></input>
                                                        <button key={benefit} type='button' className='btn-remove'>-</button>
                                                      </div>)}
                    <button type='button' className='btn-add-selection' onClick={()=>handleMoreClicked()}>Add more</button>
                  </div>
                  <div className="form-group">
                    <div>
                      <button className='btn-cancel' type='button'>Cancel</button>
                      <button className='btn-create' type='submit'>{context}</button>  
                    </div>
                  </div>
              </div>
            </form>
        </div>
    </div>
  )
}

export default ModalCUPrice