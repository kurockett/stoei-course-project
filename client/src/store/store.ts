import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            // logger,
            thunk
        )
    )
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
