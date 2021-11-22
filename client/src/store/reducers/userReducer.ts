import { AuthState, AuthAction, AuthActionTypes } from '../types/authTypes'

const initialState: AuthState = {
    token: null,
    roles: localStorage.roles || [],
    message: null,
    error: null,
    authorized: false,
}

export const userReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        default:
            return { ...state }
    }
}
