import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AuthActionTypes, AuthRequestForm } from '../types/authTypes'

export const signIn = (form: AuthRequestForm, navigate: any) => {
    return async (dispatch: any) => {
        try {
            console.log(form)
            const request = await axios.post(
                `${API_URL}/api/auth/sign-in`,
                form
            )
            const payload = {
                roles: request.data.user.roles,
                token: request.data.token,
            }
            localStorage.token = payload.token
            localStorage.authorized = 'true'
            localStorage.roles = JSON.stringify(payload.roles)
            dispatch(signInSuccess(payload))
            navigate('/projects')
        } catch (e) {
            console.error(e)
        }
    }
}

export const signUp = (form: AuthRequestForm) => {
    return async (dispatch: AppDispatch) => {
        try {
            console.log(form)
            const request = await axios.post(
                `${API_URL}/api/auth/sign-up`,
                form
            )
            console.log(request.data)
        } catch (e) {
            console.error(e)
        }
    }
}

export const signInSuccess = (data: object) => ({
    type: AuthActionTypes.SIGN_IN_SUCCESS,
    payload: data,
})

export const auth = (token: string | null) => {
    return async (dispatch: AppDispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            }
            const response = await axios.get(`${API_URL}/api/auth`, { headers })
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }
}

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('authorized')
            localStorage.removeItem('token')
            dispatch({ type: AuthActionTypes.LOGOUT })
        } catch (error) {}
    }
}
