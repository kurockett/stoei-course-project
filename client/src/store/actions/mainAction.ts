import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { Projects } from '../types/mainTypes'

export interface MainProps {
    token: string
    role: string
}

export const getProjects = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get<Projects[]>(
                `${API_URL}/api/projects`
            )
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }
}
