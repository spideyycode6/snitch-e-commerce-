import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Register from '../feature/auth/pages/Regsiter'
import Login from '../feature/auth/pages/Login'
import AuthSuccess from '../feature/auth/pages/AuthSuccess'
import CreateProduct from '../feature/products/pages/CreateProduct'
import MyProducts from '../feature/products/pages/MyProducts'
import SyncError from '../feature/products/pages/SyncError'
import HomePage from '../feature/products/pages/HomePage'
import ProductDetail from '../feature/products/pages/ProductDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement(HomePage),
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
    {
        path: '/products/:productId',
        element: React.createElement(ProductDetail),
    },

    {
        path: '/seller/product/create',
        element: React.createElement(CreateProduct),
    },
    {
        path: '/sync-error',
        element: React.createElement(SyncError),
    },
    {
        path: '/seller/dashboard',
        element: React.createElement(MyProducts),
    },
])