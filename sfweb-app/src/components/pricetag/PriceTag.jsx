import React, { useEffect, useState } from 'react'

const PriceTag = ({priceTag, isCheckedAll}) => {

    const [isChecked, setIsChecked] = useState(priceTag.ischoose);

    const handleCheckBoxClicked = () => {
        if(isChecked)
            setIsChecked(false);
        else
            setIsChecked(true);
    }

    useEffect(()=>{
        setIsChecked(isCheckedAll);
    },[isCheckedAll])

  return (
    <tr>
        <div className={(isChecked)? "checkbox checked":"checkbox"} onClick={()=>handleCheckBoxClicked()}>
            <div className="inner-checkbox"></div>
        </div>
        <td>{priceTag.price} &#8363;</td>
        {priceTag.ischoose? <td>Active</td>:<td>Inactive</td>}
        <td>
            <div className='action-group'>
                <button className='btn-activate'>Activate</button>
                <button className='btn-deactivate'>Deactivate</button>
            </div>
        </td>
    </tr>
  )
}

export default PriceTag