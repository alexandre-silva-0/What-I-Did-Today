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

const taskService = {
    createTask
}

export default taskService