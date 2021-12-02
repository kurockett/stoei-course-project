import { combineReducers } from 'redux'
import { adminReducer } from './adminReducer'
import { authReducer } from './authReducer'
import { mainReducer } from './mainReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    auth: authReducer,
    main: mainReducer,
    admin: adminReducer,
    user: userReducer,
})
