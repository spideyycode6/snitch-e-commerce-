import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
// import Home from '../feature/home/Home'
import Register from '../feature/auth/pages/Regsiter'
import Login from '../feature/auth/pages/Login'
import AuthSuccess from '../feature/auth/pages/AuthSuccess'



export const router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement('div', null, 'Home Page'), // Replace with actual Home component
    },
    {
        path: '/auth/success',
        element: React.createElement(AuthSuccess),
    },
    {   
        path: '/register',
        element: React.createElement(Register),
    },
    {
        path: '/login',
        element: React.createElement(Login),
    },
])