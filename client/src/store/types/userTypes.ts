import { Projects, Users, Tasks } from './mainTypes'

export interface UserState {
    projects: Projects[]
    currentProject: Projects
    currentUser: Users
    tasks: Tasks[]
    currentTask: Tasks
}
