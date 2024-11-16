import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '../../layouts/user/root/RootLayout'
import Home from '../../layouts/user/home/Home'
import Profile from '../../layouts/user/profile/Profile'
import Registration from '../../layouts/user/registration/Registration'
import UserPost from '../../components/userinfo/userpost/UserPost'
import UserOrder from '../../components/userinfo/userorder/UserOrder'
import RestaurantQuery from '../../layouts/user/restaurantquery/RestaurantQuery'
import NotFoundPage from '../../pages/notfoundpage/NotFoundPage'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'profile',
                element: <Profile/>,
                children: [
                    {
                        index: true,
                        element: <UserPost/>,
                    },
                    {
                        path: 'orders',
                        element: <UserOrder/>,
                    },
                ],
            },
            {
                path: 'restaurantquery',
                element: <RestaurantQuery/>,
            },
        ],
    },
    {
        path: '/registration',
        element: <Registration/>,
    },
]);