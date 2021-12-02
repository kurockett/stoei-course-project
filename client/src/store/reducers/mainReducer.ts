import { MainAction, MainActionTypes, MainState } from '../types/mainTypes'

const initialState: MainState = {
    loading: false,
}

export const mainReducer = (
    state = initialState,
    action: MainAction
): MainState => {
    switch (action.type) {
        case MainActionTypes.SHOW_LOADER:
            return { ...state, loading: true }

        case MainActionTypes.HIDE_LOADER:
            return { ...state, loading: false }

        default:
            return { ...state }
    }
}
