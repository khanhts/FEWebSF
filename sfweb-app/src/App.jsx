import React from 'react'
import { useAuth } from './services/auth/AuthProvider'
import RootLayout from './layouts/user/root/RootLayout';
import Registration from './layouts/user/registration/Registration';

const App = () => {
  const {isLoggedIn} = useAuth();
  return (
    <>
        {isLoggedIn?<RootLayout></RootLayout>:<Registration></Registration>}
    </>
  )
}

export default App