import { api, requestConfig } from '../utils/config'

const createTask = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + '/api/tasks', config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const getTasks = async () => {
    const config = requestConfig("GET")

    try {
        const res = await fetch(api + "/api/tasks", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const getTaskById = async (id) => {
    const config = requestConfig("GET")

    try {
        const res = await fetch(api + `/api/tasks/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const updateTask = async (data) => {
    const config = requestConfig("PATCH", data)

    try {

        const res = await fetch(api + `/api/tasks/${data.id}`, config)
            .then((res) => res.json())
            .catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
    }
}

const deleteTask = async (id) => {
    const config = requestConfig("DELETE")

    try {
        const res = await fetch(api + `/api/tasks/${id}`, config)
            .then((res) => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const createAssignment = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + '/api/assignments', config)
            .then((res) => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const updateAssignment = async (data) => {
    const config = requestConfig("PATCH", data)

    try {
        const res = await fetch(api + `/api/assignments/${data.id}`, config)
            .then((res) => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const deleteAssignment = async (id) => {
    const config = requestConfig("DELETE")

    try {
        const res = await fetch(api + `/api/assignments/${id}`, config)
            .then((res) => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

const getAssignments = async () => {
    const config = requestConfig("GET")

    try {
        const res = await fetch(api + '/api/assignments', config)
            .then((res) => res.json())
            .catch(err => err)

        return res
    } catch (error) {
        console.log(error)
    }
}


const taskService = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignments
}

export default taskService