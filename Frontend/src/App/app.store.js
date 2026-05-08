import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../feature/auth/states/auth.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
         // Add other reducers here
    },
})