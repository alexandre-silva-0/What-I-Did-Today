//redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: false,
    success: false,
    message: null
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

export const updateTask = createAsyncThunk(
    "tasks/update",
    async (updatedTask, { rejectWithValue }) => {
        const data = await taskService.updateTask(updatedTask)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (id, { rejectWithValue }) => {
        const data = await taskService.deleteTask(Number(id))

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
            state.message = null
        },
        clearMessage: (state) => {
            state.success = false
            state.error = false
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.task = action.payload.data
                state.tasks.unshift(action.payload.data)
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload.errors
                state.loading = false
            })
            .addCase(getTasks.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload.data
                state.error = false
                state.success = action.payload.msg
                state.loading = false
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
                state.task = action.payload.data
                state.error = false
                state.success = action.payload.msg
                state.loading = false
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.task = {}
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.task = action.payload.data
                state.tasks = state.tasks.map((task) =>
                    task.id === action.payload.data.id ? action.payload.data : task,
                );
                state.error = false
                state.success = true
                state.message = action.payload.msg
                state.loading = false
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.task = {}
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.task = {}
                state.tasks = state.tasks.filter(
                    (task) => task.id !== action.payload.data,
                );
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.task = {}
            })
    }
})

export const { reset, clearMessage } = taskSlice.actions
export default taskSlice.reducer