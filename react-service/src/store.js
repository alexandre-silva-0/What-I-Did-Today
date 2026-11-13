//hooks
import { configureStore } from '@reduxjs/toolkit'

//reducers
import { taskSlice } from './slices/taskSlice'

export const store = configureStore({
    reducer: {
        task: taskSlice
    }
})