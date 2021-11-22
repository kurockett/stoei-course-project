import { UserState } from './userTypes'
import { Projects, Users, Roles, Categories, Tasks, Labels } from './mainTypes'

export interface AdminState extends UserState {
    users: Users[]
}

export enum AdminActionTypes {
    SET_ADMIN = 'ADMIN/SET_ADMIN',
    SET_USERS = 'ADMIN/SET_USERS',
    SET_USER = 'ADMIN/SET_USER',
    SET_PROJECTS = 'ADMIN/SET_PROJECTS',
    SET_PROJECT = 'ADMIN/SET_PROJECT',
    SET_ROLES = 'ADMIN/SET_ROLES',
    SET_ROLE = 'ADMIN/SET_ROLE',
    SET_CATEGORIES = 'ADMIN/SET_CATEGORIES',
    SET_CATEGORY = 'ADMIN/SET_CATEGORY',
    SET_TASKS = 'ADMIN/SET_TASKS',
    SET_TASK = 'ADMIN/SET_TASK',
    SET_LABELS = 'ADMIN/SET_LABELS',
    SET_LABEL = 'ADMIN/SET_LABEL',
}

export interface SetAdminAction {
    type: AdminActionTypes.SET_ADMIN
}

export interface SetUsersAction {
    type: AdminActionTypes.SET_USERS
    payload: Users[]
}

export interface SetUserAction {
    type: AdminActionTypes.SET_USER
    payload: Users
}

export interface SetProjectsAction {
    type: AdminActionTypes.SET_PROJECTS
    payload: Projects[]
}

export interface SetProjectAction {
    type: AdminActionTypes.SET_PROJECT
    payload: Projects
}

export interface SetRolesAction {
    type: AdminActionTypes.SET_ROLES
    payload: Roles[]
}

export interface SetRoleAction {
    type: AdminActionTypes.SET_ROLE
    payload: Roles
}

export interface SetCategoriesAction {
    type: AdminActionTypes.SET_CATEGORIES
    payload: Categories[]
}

export interface SetCategoryAction {
    type: AdminActionTypes.SET_CATEGORY
    payload: Categories
}

export interface SetTasksAction {
    type: AdminActionTypes.SET_TASKS
    payload: Tasks[]
}

export interface SetTaskAction {
    type: AdminActionTypes.SET_TASK
    payload: Tasks
}

export interface SetLabelsAction {
    type: AdminActionTypes.SET_LABELS
    payload: Labels[]
}

export interface SetLabelAction {
    type: AdminActionTypes.SET_LABEL
    payload: Labels
}

export type AdminAction =
    | SetAdminAction
    | SetUsersAction
    | SetUserAction
    | SetProjectsAction
    | SetProjectAction
    | SetRolesAction
    | SetRoleAction
    | SetCategoriesAction
    | SetCategoryAction
    | SetTasksAction
    | SetTaskAction
    | SetLabelsAction
    | SetLabelAction
