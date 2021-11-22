export interface Users {
    id: number
    email: string
    password: string
    createdAt: string
    updatedAt: string
    roles?: Roles[]
    projects?: Projects[]
}

export interface Roles {
    id: number
    value: string
    description: string
    UserRoles?: UserRoles[]
    users?: Users[]
}

export interface UserRoles {
    id: number
    roleId: number
    userId: number
}

export interface Projects {
    id: number
    name: string
    description: string
}

export interface UserProjects {
    id: number
    projectId: number
    userId: number
}

export interface Tasks {
    id: number
    name: string
    description: string
    estimate: number
    projectId: number
}

export interface UserTasks {
    id: number
    roleId: number
    userId: number
}

export interface Labels {
    id: number
    value: string
    color: string
    projectId: number
}

export interface TaskLabels {
    id: number
    labelId: number
    taskId: number
}

export interface Categories {
    id: number
    value: string
}

export interface CategoryTasks {
    id: number
    taskId: number
    categoryId: number
}
