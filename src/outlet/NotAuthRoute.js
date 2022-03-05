import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const NotAuthRoute = () => {
    const isLogin = JSON.parse(localStorage.getItem('login'))
    return (
        !isLogin ? <Outlet /> : <Navigate to={'/home'} />
    )
}

export default NotAuthRoute