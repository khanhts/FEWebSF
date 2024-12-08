import React, { useEffect, useState } from 'react'
import './pricecard.css'
import { createUpgradeRequest } from '../../services/axios/AxiosUpgrade'
import { fetchUpgradePlans } from '../../services/axios/AxiosPrice'
const PriceCard = ({myAcc, token}) => {

  const [pricePlan, setPricePlan] = useState({
    title: "",
    price: 0,
    benefit: ""
  });

  const initPricePlan = async() => {
    const response = await fetchUpgradePlans(token);
    setPricePlan(response.data)
  }

  const handleCreateAccountClicked = async() => {
    const response = await createUpgradeRequest(myAcc.id, token);
  }

  useEffect(()=>{
   initPricePlan()
  },[])

  return (
    <div className="price-card">
        <div className="card-header">
            <p className='header-title'>{pricePlan.title}</p>
            <h1 className='header-content'>{pricePlan.price} &#8363;</h1>
        </div>
        <div className="card-body">
            <ul>
                <li>{pricePlan.benefit}</li>
            </ul>
            <button onClick={async()=>handleCreateAccountClicked()}>Create Account</button>
        </div>
    </div>
  )
}

export default PriceCard