//redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../services/taskService";

const initialState = {
    tasks: [],
    task: {},
    assignment: {},
    assignments: [],
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

export const createAssignment = createAsyncThunk(
    "assignments/create",
    async (assignment, { rejectWithValue }) => {
        const data = await taskService.createAssignment(assignment)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const updateAssignment = createAsyncThunk(
    "assignments/update",
    async (updatedAssignment, { rejectWithValue }) => {
        const data = await taskService.updateAssignment(updatedAssignment)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const deleteAssignment = createAsyncThunk(
    "assignments/delete",
    async (id, { rejectWithValue }) => {
        const data = await taskService.deleteAssignment(id)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const getAssignments = createAsyncThunk(
    "assignments/all",
    async (_, { rejectWithValue }) => {
        const data = await taskService.getAssignments()

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const getAssignmentById = createAsyncThunk(
    "assignments/id",
    async (id, { rejectWithValue }) => {
        const data = await taskService.getAssignmentById(id)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const uploadAttachments = createAsyncThunk(
    "attachments/upload",
    async ({ taskId, files }, { rejectWithValue }) => {
        const data = await taskService.uploadAttachments(taskId, files)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

export const deleteAttachment = createAsyncThunk(
    "attachments/delete",
    async (id, { rejectWithValue }) => {
        const data = await taskService.deleteAttachment(id)

        if (data.errors) return rejectWithValue(data.errors[0])

        return data
    }
)

// Aplica uma mudança na lista de anexos da tarefa aberta e da mesma tarefa na lista
const updateTaskAttachments = (state, taskId, change) => {
    const apply = (task) => {
        if (task && task.id === taskId) {
            task.attachments = change(task.attachments ?? [])
        }
    }

    apply(state.task)
    state.tasks.forEach(apply)
}

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
            state.assignment = {}
            state.assignments = []
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
                state.error = action.payload
                state.loading = false
            })
            .addCase(getTasks.pending, (state) => {
                // Com a lista já no store, atualiza em segundo plano sem cobrir a tela
                state.loading = state.tasks.length === 0
                state.error = false
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasks = action.payload.data ?? []
                state.error = false
                state.success = true
                state.loading = false
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
                state.tasks = []
            })
            .addCase(getTaskById.pending, (state, action) => {
                // Só cobre a tela se a tarefa aberta ainda não for a pedida
                state.loading = String(state.task?.id) !== String(action.meta.arg)
                state.error = false
            })
            .addCase(getTaskById.fulfilled, (state, action) => {
                state.task = action.payload.data
                state.error = false
                state.success = true
                state.loading = false
            })
            .addCase(getTaskById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
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
                state.message = action.payload
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
                state.message = action.payload
                state.task = {}
            })
            .addCase(createAssignment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                state.assignment = action.payload.data
                state.assignments.unshift(action.payload.data)
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(updateAssignment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(updateAssignment.fulfilled, (state, action) => {
                state.assignment = action.payload.data
                state.assignments = state.assignments.map((assignment) =>
                    assignment.id === action.payload.data.id ? action.payload.data : assignment,
                );
                state.error = false
                state.success = true
                state.message = action.payload.msg
                state.loading = false
            })
            .addCase(updateAssignment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
                state.assignment = {}
            })
            .addCase(deleteAssignment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.assignment = {}
                state.assignments = state.assignments.filter(
                    (assignment) => assignment.id !== action.payload.data,
                );
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(deleteAssignment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
                state.assignment = {}
            })
            .addCase(getAssignments.pending, (state) => {
                state.loading = state.assignments.length === 0
                state.error = false
            })
            .addCase(getAssignments.fulfilled, (state, action) => {
                state.assignments = action.payload.data ?? []
                state.error = false
                state.success = true
                state.loading = false
            })
            .addCase(getAssignments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
                state.assignments = []
            })
            .addCase(getAssignmentById.pending, (state, action) => {
                state.loading = String(state.assignment?.id) !== String(action.meta.arg)
                state.error = false
            })
            .addCase(getAssignmentById.fulfilled, (state, action) => {
                state.assignment = action.payload.data
                state.error = false
                state.success = true
                state.loading = false
            })
            .addCase(getAssignmentById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
                state.assignment = {}
            })
            .addCase(uploadAttachments.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(uploadAttachments.fulfilled, (state, action) => {
                const { taskId, attachments } = action.payload.data
                updateTaskAttachments(state, taskId, (list) => [...list, ...attachments])
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(uploadAttachments.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
            })
            .addCase(deleteAttachment.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(deleteAttachment.fulfilled, (state, action) => {
                const { id, taskId } = action.payload.data
                updateTaskAttachments(state, taskId, (list) => list.filter((item) => item.id !== id))
                state.error = false
                state.success = true
                state.loading = false
                state.message = action.payload.msg
            })
            .addCase(deleteAttachment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.message = action.payload
            })
    }
})

export const { reset, clearMessage } = taskSlice.actions
export default taskSlice.reducer