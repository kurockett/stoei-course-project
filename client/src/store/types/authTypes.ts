import { Roles } from './mainTypes'

export interface AuthState {
    token: string | null
    roles: Roles[]
    message: string | null
    error: string | null
    authorized: boolean
}

export interface AuthRequestForm {
    email: string
    password: string
}

export enum AuthActionTypes {
    SIGN_IN = 'AUTH/SIGN_IN',
    SIGN_IN_SUCCESS = 'AUTH/SIGN_IN_SUCCESS',
    SIGN_IN_ERROR = 'AUTH/SIGN_IN_ERROR',
    SIGN_UP = 'AUTH/SIGN_UP',
    SIGN_UP_SUCCESS = 'AUTH/SIGN_UP_SUCCESS',
    SIGN_UP_ERROR = 'AUTH/SIGN_UP_ERROR',
    RESET_PASSWORD = 'AUTH/RESET_PASSWORD',
    LOGOUT = 'AUTH/LOGOUT',
}

export interface AuthSignInAction {
    type: AuthActionTypes.SIGN_IN
}

export interface AuthSignInSuccessAction {
    type: AuthActionTypes.SIGN_IN_SUCCESS
    payload: {
        token: string
        roles: Roles[]
    }
}

export interface AuthSignInErrorAction {
    type: AuthActionTypes.SIGN_IN_ERROR
    payload: string
}

export interface AuthSignUpAction {
    type: AuthActionTypes.SIGN_UP
}

export interface AuthSignUpSuccessAction {
    type: AuthActionTypes.SIGN_UP_SUCCESS
    payload: string
}

export interface AuthSignUpErrorAction {
    type: AuthActionTypes.SIGN_UP_ERROR
    payload: string
}

export interface AuthResetPasswordAction {
    type: AuthActionTypes.RESET_PASSWORD
    payload: any
}

export interface AuthLogoutAction {
    type: AuthActionTypes.LOGOUT
}

export type AuthAction =
    | AuthSignInAction
    | AuthSignInSuccessAction
    | AuthSignInErrorAction
    | AuthSignUpAction
    | AuthSignUpSuccessAction
    | AuthSignUpErrorAction
    | AuthResetPasswordAction
    | AuthLogoutAction
