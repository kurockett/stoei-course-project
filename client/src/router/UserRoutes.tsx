import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

const UserRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}

export default UserRoutes
