import { AdminAction, AdminActionTypes, AdminState } from '../types/adminTypes'
import { Projects, Users, Tasks } from '../types/mainTypes'

const initialState: AdminState = {
    projects: [],
    currentProject: {} as Projects,
    users: [],
    currentUser: {} as Users,
    tasks: [],
    currentTask: {} as Tasks,
}

export const adminReducer = (
    state = initialState,
    action: AdminAction
): AdminState => {
    switch (action.type) {
        case AdminActionTypes.SET_ADMIN:
            return {
                ...state,
                projects: [],
                currentProject: {} as Projects,
                users: [],
                currentUser: {} as Users,
                tasks: [],
                currentTask: {} as Tasks,
            }

        case AdminActionTypes.SET_USERS:
            return { ...state, users: action.payload }

        case AdminActionTypes.SET_USER:
            return { ...state, currentUser: action.payload }

        case AdminActionTypes.SET_PROJECTS:
            return { ...state, projects: action.payload }

        case AdminActionTypes.SET_PROJECT:
            return { ...state, currentProject: action.payload }

        case AdminActionTypes.SET_TASKS:
            return { ...state, tasks: action.payload }

        case AdminActionTypes.SET_TASK:
            return { ...state, currentTask: action.payload }

        default:
            return { ...state }
    }
}
