import React, { useState } from 'react'
import UnauthorizedRoutes from './UnauthorizedRoutes'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'
import { Roles } from '../store/types/mainTypes'

interface Routes {
    [key: string]: JSX.Element
}

const useRoute = (authorized: boolean, roles: Roles[]) => {
    const [routes] = useState<Routes>({
        ADMIN: <AdminRoutes />,
        USER: <UserRoutes />,
    })

    if (!authorized || !roles || roles?.length === 0) {
        return <UnauthorizedRoutes />
    }
    return routes[roles[0].value]
}

export default useRoute
