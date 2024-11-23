import {createBrowserRouter} from 'react-router-dom'
import RootLayout from '../../layouts/user/root/RootLayout'


import Registration from '../../layouts/user/registration/Registration'
import UserPost from '../../components/userinfo/userpost/UserPost'
import UserOrder from '../../components/userinfo/userorder/UserOrder'

import NotFoundPage from '../../pages/notfoundpage/NotFoundPage'
import HomePage from '../../layouts/user/home/HomePage'
import ProfilePage from '../../layouts/user/profile/ProfilePage'
import RestaurantPage from '../../layouts/user/restaurant/RestaurantPage'
import QueryRestaurant from '../../layouts/user/queryrestaurant/QueryRestaurant'
import CreatePost from '../../layouts/user/post/create/CreatePost'
import EditPost from '../../layouts/user/post/edit/EditPost'
import DetailPost from '../../layouts/user/post/detail/DetailPost'





export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'profile',
                element: <ProfilePage/>,
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
                path: 'search-restaurant',
                element: <QueryRestaurant/>,
            },
            {
                path: 'restaurant',
                element: <RestaurantPage/>,
            },
            {
                path: 'post',
                children:[
                    {
                        path: 'create',
                        element: <CreatePost/>,
                    },
                    {
                        path: 'edit',
                        element: <EditPost/>,
                    },
                    {
                        path: 'detail',
                        element: <DetailPost/>
                    }
                ]
            }
        ],
    },
    {
        path: '/registration',
        element: <Registration/>,
    },
]);