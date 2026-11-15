import { api, requestConfig } from '../utils/config'

const createTask = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + '/api/tasks/create', config)
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
        const res = await fetch(api + `/api/task/${id}`, config)
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

        const res = await fetch(api + `/api/tasks/${data.id}/update`, config)
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
        const res = await fetch(api + `/api/tasks/${id}/delete`, config)
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
    deleteTask
}

export default taskService