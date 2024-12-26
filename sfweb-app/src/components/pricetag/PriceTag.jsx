import React, { useEffect, useState } from 'react'
import { acceptUpgradeRequest } from '../../services/axios/AxiosUpgrade';

const PriceTag = ({priceTag, isCheckedAll, isUncheckedAll, handleCancelCheckAll, handleCancelUncheckAll, handleSelect, handleDeselect}) => {
    
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBoxClicked = () => {
        if(isChecked){
            setIsChecked(false);
            handleCancelCheckAll();
        }
        else{
            setIsChecked(true);
            handleCancelUncheckAll();
        }
    }

    const handleActivateClicked = async() => {
        
    }

    useEffect(()=>{
        if(isChecked)
            handleSelect(priceTag.id)
        else
            handleDeselect(priceTag.id)
    }, [isChecked])

    useEffect(()=>{if(isCheckedAll) setIsChecked(true)},[isCheckedAll])

    useEffect(()=>{if(isUncheckedAll) setIsChecked(false)},[isUncheckedAll])

  return (
    <tr>
        <td>
            <div className={isChecked||isCheckedAll? "checkbox checked":"checkbox"} onClick={()=>handleCheckBoxClicked()}>
                <div className="inner-checkbox"></div>
            </div>
        </td>
        <td>{priceTag.price} &#8363;</td>
        {priceTag.is_choose? <td><span className='text-active'>Active</span></td>:<td><span className='text-inactive'>Inactive</span></td>}
        <td>
            <div className="td-group">
                {priceTag.is_choose?
                <button className='btn-deactivate'>Deactivate</button>
                :
                <button className='btn-activate'>Activate</button>
                }
            </div>
        </td>
    </tr>
  )
}

export default PriceTag