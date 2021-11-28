import { UserState } from '../types/userTypes'
import { Projects, Tasks, Users } from '../types/mainTypes'

const initialState: UserState = {
    projects: [],
    currentProject: {} as Projects,
    currentUser: {} as Users,
    tasks: [],
    currentTask: {} as Tasks,
}

export const userReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        default:
            return { ...state }
    }
}
