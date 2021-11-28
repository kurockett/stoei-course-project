import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignInPage from '../pages/SignInPage'
import SignUpPage from '../pages/SignUpPage'
import AdminPanelPage from '../pages/admin/AdminPanelPage'
import UsersPage from '../pages/admin/UsersPage'
import TasksPage from '../pages/admin/TasksPage'
import ProjectsPage from '../pages/admin/ProjectsPage'

const AdminRoutes: React.FC = () => (
    <Routes>
        <Route path={'/admin'} element={<AdminPanelPage />} />
        <Route path={'/users'} element={<UsersPage />} />
        <Route path={'/tasks'} element={<TasksPage />} />
        <Route path={'/projects'} element={<ProjectsPage />} />
        <Route path={'/sign-up'} element={<SignUpPage />} />
        <Route path={'/sign-in'} element={<SignInPage />} />
        <Route path={'/'} element={<HomePage />} />
    </Routes>
)

export default AdminRoutes
