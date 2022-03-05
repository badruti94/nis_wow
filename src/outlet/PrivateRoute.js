import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const isLogin = JSON.parse(localStorage.getItem('login'))
    return (
        isLogin ? <Outlet /> : <Navigate to={'/'} />
    )
}

export default PrivateRoute