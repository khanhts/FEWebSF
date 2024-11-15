import { Outlet, useNavigate } from 'react-router-dom';
import './App.css'
import { useEffect } from 'react';



function App(){
  let token = 0;
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(process.env.REACT_APP_API_BASEURL)
    navigate('registration')
  },[]);
  return(
    <Outlet/>
  );
}

export default App
