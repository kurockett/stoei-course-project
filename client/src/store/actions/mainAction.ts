import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AdminActionTypes } from '../types/adminTypes'
import { MainActionTypes, Projects } from '../types/mainTypes'

export interface MainProps {
    token: string
    role: string
}

export const showLoader = () => ({ type: MainActionTypes.SHOW_LOADER })

export const hideLoader = () => ({ type: MainActionTypes.HIDE_LOADER })

export const getProjects = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(showLoader())
            dispatch(setProjects([]))
            const { data } = await axios.get<Projects[]>(
                `${API_URL}/api/projects/`
            )
            dispatch(setProjects(data))
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const setProjects = (data: any) => ({
    type: AdminActionTypes.SET_PROJECTS,
    payload: data,
})

export const setProject = (data: any) => ({
    type: AdminActionTypes.SET_PROJECT,
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
