import { AuthState, AuthAction, AuthActionTypes } from '../types/authTypes'

const initialState: AuthState = {
    token: localStorage.token,
    roles: localStorage.roles && (JSON.parse(localStorage.roles) || []),
    message: null,
    error: null,
    authorized: Boolean(localStorage.authorized),
}

export const authReducer = (
    state = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN:
            return {
                ...state,
                token: null,
                message: null,
                error: null,
                authorized: false,
            }

        case AuthActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                roles: action.payload.roles,
                error: null,
                authorized: true,
            }

        case AuthActionTypes.SIGN_IN_ERROR:
            return {
                ...state,
                token: null,
                error: action.payload,
                authorized: false,
            }

        case AuthActionTypes.SIGN_UP:
            return { ...state, message: null }

        case AuthActionTypes.SIGN_UP_SUCCESS:
            return { ...state, message: action.payload, error: null }

        case AuthActionTypes.SIGN_UP_ERROR:
            return { ...state, message: null, error: action.payload }

        case AuthActionTypes.RESET_PASSWORD:
            return { ...state }

        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                token: null,
                message: null,
                error: null,
                authorized: false,
            }
        }

        default:
            return { ...state }
    }
}
