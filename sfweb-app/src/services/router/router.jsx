import {createBrowserRouter} from 'react-router-dom'


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
import AdminSignIn from '../../layouts/admin/signin/AdminSignIn'
import SearchedUser from '../../layouts/user/search/SearchedUser'
import AdminRoot from '../../layouts/admin/root/AdminRoot'
import AdminHome from '../../layouts/admin/home/AdminHome'
import AccessDeniedPage from '../../pages/accessDeniedPage/AccessDeniedPage'
import ForgotPassword from '../../pages/forgot_password/ForgotPassword'
import AccountUpgrade from '../../layouts/admin/accountupgrade/AccountUpgrade'
import PriceManagement from '../../layouts/admin/upgradeprice/PriceManagement'
import ReportManagement from '../../layouts/admin/report/ReportManagement'
import ResetPassword from '../../pages/reset_password/ResetPassword'
import NotificationPage from '../../layouts/user/notification/NotificationPage'
import UserRestaurant from '../../components/userinfo/userrestaurant/UserRestaurant'
import UserFriend from '../../components/userinfo/userfriend/UserFriend'
import RootLayout from '../../layouts/user/root/RootLayout'
import RestaurantCreate from '../../layouts/user/restaurant/create/RestaurantCreate'



const protectedRoutes = [
    {
        index: true,
        element: <HomePage/>,
    },
    {
        path: 'notification',
        element: <NotificationPage/>
    },
    {
        path: 'profile/:accountID/',
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
            {
                path: 'restaurants',
                element: <UserRestaurant/>
            },
            {
                path: 'friend',
                element: <UserFriend/>
            }
        ],
    },
    {
        path: 'create-restaurant/:accountID',
        element: <RestaurantCreate/>
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
        path: 'search/users',
        element: <SearchedUser/>
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
]

const privateRoutes = [
    {
        index: true,
        path: "home",
        element: <AdminHome/>
    },
    {
        path: "account-upgrade",
        element: <AccountUpgrade/>
    },
    {
        path: "report",
        element: <ReportManagement/>
    },
    {
        path: "price",
        element: <PriceManagement/>
    }
]


export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFoundPage/>,
        children: protectedRoutes,
    },
    { 
        path: "/admin",
        element: <AdminRoot/>,
        errorElement: <NotFoundPage/>,
        children: privateRoutes
    },
    {
        path: '/registration',
        element: <Registration/>,
    },
    {
        path: '/admin/signin',
        element: <AdminSignIn/>
    },
    {
        path: '/access-denied',
        element: <AccessDeniedPage/>
    },
    {
        path:'/forgot-password',
        element: <ForgotPassword/>
    },
    {
        path:'/reset-password',
        element: <ResetPassword/>
    }
]);