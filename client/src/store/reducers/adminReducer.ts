import { AdminAction, AdminState } from '../types/adminTypes'
import { Projects, Users } from '../types/mainTypes'

const initialState: AdminState = {
    projects: [],
    currentProject: {} as Projects,
    users: [],
    currentUser: {} as Users,
}

export const adminReducer = (
    state = initialState,
    action: AdminAction
): AdminState => {
    switch (action.type) {
        default:
            return { ...state }
    }
}
