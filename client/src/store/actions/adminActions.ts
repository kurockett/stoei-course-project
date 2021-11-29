import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AdminActionTypes } from '../types/adminTypes'
import { Projects, Tasks, Users } from '../types/mainTypes'

export const getProjects = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setProjects([]))
            const { data } = await axios.get<Projects[]>(
                `${API_URL}/api/projects/`
            )
            dispatch(setProjects(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const setProjects = (data: any) => ({
    type: AdminActionTypes.SET_PROJECTS,
    payload: data,
})

export const deleteProject = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete(`${API_URL}/api/projects/${id}`)
            dispatch(getProjects())
        } catch (e) {
            console.error(e)
        }
    }
}

export const getUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setUsers([]))
            const { data } = await axios.get<Users[]>(`${API_URL}/api/users/`)
            dispatch(setUsers(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const setUsers = (data: any) => ({
    type: AdminActionTypes.SET_USERS,
    payload: data,
})

export const deleteUser = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete(`${API_URL}/api/users/${id}`)
            dispatch(getUsers())
        } catch (e) {
            console.error(e)
        }
    }
}

export const getTasks = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setTasks([]))
            const { data } = await axios.get<Tasks[]>(`${API_URL}/api/tasks/`)
            dispatch(setTasks(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const setTasks = (data: any) => ({
    type: AdminActionTypes.SET_TASKS,
    payload: data,
})

export const deleteTask = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            await axios.delete(`${API_URL}/api/tasks/${id}`)
            dispatch(getTasks())
        } catch (e) {
            console.error(e)
        }
    }
}
