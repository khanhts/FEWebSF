import {createBrowserRouter, createRoutesFromElements, Route, Router} from 'react-router-dom'
import RootLayout from '../../layouts/user/root/RootLayout'
import Home from '../../layouts/user/home/Home'
import Profile from '../../layouts/user/profile/Profile'
import Registration from '../../layouts/user/registration/Registration'
import UserPost from '../../components/userinfo/userpost/UserPost'
import UserOrder from '../../components/userinfo/userorder/UserOrder'
import App from '../../App'


export const router = createBrowserRouter((
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='root' element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='profile' element={<Profile/>}>
                    <Route  index element={<UserPost/>}/>
                    <Route  path='orders' element={<UserOrder/>}/>
                </Route>
            </Route>    
            <Route path='registration' element={<Registration/>}/>
        </Route>
    )
))