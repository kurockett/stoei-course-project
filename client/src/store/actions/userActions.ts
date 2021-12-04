import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AdminActionTypes } from '../types/adminTypes'
import { Projects, Tasks, Users } from '../types/mainTypes'
import { hideLoader, setProject, setProjects, showLoader } from './mainAction'
import { setUsers } from './adminActions'

export const getAllUserRoleUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(setUsers([]))
            const { data } = await axios.get<Users[]>(
                `${API_URL}/api/users/role/user`
            )
            dispatch(setUsers(data))
        } catch (e) {
            console.error(e)
        }
    }
}

export const getUserProjects = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader())
            dispatch(setProjects([]))
            const { data } = await axios.get<Projects[]>(
                `${API_URL}/api/projects/user/${id}`
            )
            dispatch(setProjects(data))
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const getProjectById = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader())
            dispatch(setProject({}))
            const { data } = await axios.get<Projects>(
                `${API_URL}/api/projects/${id}`
            )
            dispatch(setProject(data))
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const createProject = (id: number, form: Projects) => {
    return async () => {
        try {
            await axios.post<Projects>(`${API_URL}/api/projects/${id}`, form)
        } catch (e) {
            console.error(e)
        }
    }
}

export const updateProject = (id: number, form: Projects) => {
    return async () => {
        try {
            await axios.put<Projects>(`${API_URL}/api/projects/${id}`, form)
        } catch (e) {
            console.error(e)
        }
    }
}

export const setUser = (data: any) => ({
    type: AdminActionTypes.SET_USER,
    payload: data,
})

export const createTask = (form: Tasks) => {
    return async () => {
        try {
            const { data } = await axios.post<Tasks>(
                `${API_URL}/api/tasks/`,
                form
            )
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }
}

export const updateTask = (form: Tasks) => {
    return async () => {
        try {
            const { id, ...body } = form
            const { data } = await axios.put<Tasks>(
                `${API_URL}/api/tasks/${id}`,
                body
            )
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }
}

export const deleteTask = (id: number) => {
    return async () => {
        try {
            await axios.delete<Tasks>(`${API_URL}/api/tasks/${id}`)
        } catch (e) {
            console.error(e)
        }
    }
}

export const createAsignee = (id: number, userId: number) => {
    return async () => {
        try {
            const { data } = await axios.post<Tasks>(
                `${API_URL}/api/tasks/new_asignee/${id}/${userId}`
            )
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }
}

export const deleteAsignee = (id: number, userId: number) => {
    return async () => {
        try {
            const { data } = await axios.delete<Tasks>(
                `${API_URL}/api/tasks/new_asignee/${id}/${userId}`
            )
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }
}
