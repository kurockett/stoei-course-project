import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AdminActionTypes } from '../types/adminTypes'
import { Projects } from '../types/mainTypes'
import { hideLoader, setProject, setProjects, showLoader } from './mainAction'

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
            const { data } = await axios.put<Projects>(
                `${API_URL}/api/projects/${id}`,
                form
            )
        } catch (e) {
            console.error(e)
        }
    }
}

export const setUser = (data: any) => ({
    type: AdminActionTypes.SET_USER,
    payload: data,
})
