//redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
    task: {},
    tasks: [],
    loading: false,
    error: false,
    success: false,
}

export const createTask = createAsyncThunk(
    "tasks/create",
    async (task, { dispatch, rejectedWithValue }) => {
        const data = await taskService.createTask(task)

        if (data.errors) return rejectedWithValue(data.errors[0])

        return data
    }
)

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false
            state.task = {}
            state.tasks = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false
                state.task = action.payload.data
                state.tasks.push(action.payload.data)
                state.error = false
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer