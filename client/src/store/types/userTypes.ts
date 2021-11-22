import { Projects, Users } from './mainTypes'

export interface UserState {
    projects: Projects[]
    currentProject: Projects
    currentUser: Users
}
