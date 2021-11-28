import React from 'react'
import AdminLayout from './AdminLayout'
import UserLayout from './UserLayout'

interface ParentLayoutProps {
    role: string
    children: React.ReactNode
}

const ParentLayout: React.FC<ParentLayoutProps> = ({ role, children }) => {
    if (role === 'ADMIN') {
        return <AdminLayout>{children}</AdminLayout>
    }
    return <UserLayout>{children}</UserLayout>
}

export default ParentLayout
