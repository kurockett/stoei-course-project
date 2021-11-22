import axios from 'axios'
import { API_URL } from '../../config'
import { AppDispatch } from '../store'
import { AuthActionTypes, AuthRequestForm } from '../types/authTypes'

export const signIn = (form: AuthRequestForm) => {
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
            dispatch(signInSuccess(payload))
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
