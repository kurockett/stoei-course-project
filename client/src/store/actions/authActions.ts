import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AuthActionTypes, AuthRequestForm } from '../types/authTypes'
import { setUser } from './userActions'

export const signIn = (form: AuthRequestForm, navigate: any) => {
    return async (dispatch: any) => {
        try {
            console.log(form)
            const response = await axios.post(
                `${API_URL}/api/auth/sign-in`,
                form
            )
            console.log(response)

            const payload = {
                roles: response.data.user.roles,
                token: response.data.token,
            }
            localStorage.token = payload.token
            localStorage.authorized = 'true'
            localStorage.roles = JSON.stringify(payload.roles)
            localStorage.user = JSON.stringify(response.data.user)
            dispatch(signInSuccess(payload))
            dispatch(setUser(response.data.user))
            navigate('/projects')
        } catch (e: any | object) {
            alert(e.response.data.message)
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
        } catch (e: any | object) {
            alert(e.response.data.message)
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
        } catch (e: any | object) {
            console.log(e.response.data.message)
        }
    }
}

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('authorized')
            localStorage.removeItem('token')
            dispatch({ type: AuthActionTypes.LOGOUT })
        } catch (e: any | object) {
            console.log(e.response.data.message)
        }
    }
}
