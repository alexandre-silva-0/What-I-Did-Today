//redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: false,
    success: false,
}

export const createTask = createAsyncThunk(
    "tasks/create",
    async (task, { rejectWithValue }) => {
        const data = await taskService.createTask(task)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const getTasks = createAsyncThunk(
    "tasks/all",
    async (_, { rejectWithValue }) => {
        const data = await taskService.getTasks()

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const getTaskById = createAsyncThunk(
    "tasks/id",
    async (id, { rejectWithValue }) => {
        const data = await taskService.getTaskById(id)

        if (data.errors) return rejectWithValue(data.errors[0])

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
                state.tasks.unshift(action.payload.data)
                state.error = false
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.data
                state.error = false
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.tasks = []
            })
            .addCase(getTaskById.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.loading = false
                state.task = action.payload.data
                console.log(action.payload.data)
                state.error = false
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.task = {}
            })
    }
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer