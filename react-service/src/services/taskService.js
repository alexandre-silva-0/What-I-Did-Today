import { api, requestConfig } from '../utils/config'

const CONNECTION_ERROR = 'Não foi possível falar com o servidor. Recarregue a página e tente de novo.'

const request = async (path, method = 'GET', data = null) => {
    // FormData (anexos) vai como multipart: o navegador monta o Content-Type sozinho
    const config = data instanceof FormData
        ? { method, body: data }
        : requestConfig(method, data)

    let res

    try {
        res = await fetch(api + path, config)
    } catch (error) {
        console.error(error)
        return { errors: [CONNECTION_ERROR] }
    }

    // Resposta que não é JSON (ex.: página HTML de login ou de erro do proxy)
    const body = await res.json().catch(() => null)

    if (!body) {
        return { errors: [CONNECTION_ERROR] }
    }

    if (!res.ok && !Array.isArray(body.errors)) {
        return { errors: [`Erro ${res.status} no servidor. Tente de novo.`] }
    }

    return body
}

const createTask = (data) => request('/api/tasks', 'POST', data)

const getTasks = () => request('/api/tasks')

const getTaskById = (id) => request(`/api/tasks/${id}`)

const updateTask = (data) => request(`/api/tasks/${data.id}`, 'PATCH', data)

const deleteTask = (id) => request(`/api/tasks/${id}`, 'DELETE')

const createAssignment = (data) => request('/api/assignments', 'POST', data)

const updateAssignment = (data) => request(`/api/assignments/${data.id}`, 'PATCH', data)

const deleteAssignment = (id) => request(`/api/assignments/${id}`, 'DELETE')

const getAssignments = () => request('/api/assignments')

const getAssignmentById = (id) => request(`/api/assignments/${id}`)

const uploadAttachments = (taskId, files) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    return request(`/api/tasks/${taskId}/attachments`, 'POST', formData)
}

const deleteAttachment = (id) => request(`/api/attachments/${id}`, 'DELETE')

// Endereço para abrir/baixar o arquivo (usado em <img> e links)
export const attachmentUrl = (id) => `${api}/api/attachments/${id}/file`

const taskService = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    getAssignments,
    getAssignmentById,
    uploadAttachments,
    deleteAttachment
}

export default taskService
