import { combineReducers } from 'redux'
import { adminReducer } from './adminReducer'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    user: userReducer,
})
