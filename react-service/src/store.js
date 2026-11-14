//hooks
import { configureStore } from '@reduxjs/toolkit'

//reducers
import taskReducer from './slices/taskSlice'

export const store = configureStore({
    reducer: {
        task: taskReducer
    }
})