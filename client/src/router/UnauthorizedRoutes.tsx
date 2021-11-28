import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'

const UnauthorizedRoutes: React.FC = () => (
    <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<SignInPage />} />
    </Routes>
)

export default UnauthorizedRoutes
