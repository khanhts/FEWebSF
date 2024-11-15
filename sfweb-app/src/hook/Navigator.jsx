import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigator = ({path}) => {
  const navigate = useNavigate()
  return navigate(path);
}

export default Navigator