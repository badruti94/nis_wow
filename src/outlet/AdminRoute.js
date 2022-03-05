import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const isAdmin = JSON.parse(localStorage.getItem('is_admin'))
    return (
        isAdmin ? <Outlet /> : <Navigate to={'/home'} />
    )
}

export default AdminRoute