import { api, requestConfig } from '../utils/config'

const CONNECTION_ERROR = 'Não foi possível falar com o servidor. Recarregue a página e tente de novo.'

/**
 * Faz a requisição e sempre devolve um objeto no formato da API:
 * - sucesso: { msg, data }
 * - erro:    { errors: ['mensagem'] }
 *
 * Nunca devolve undefined nem um objeto de erro do fetch, então os thunks
 * sempre caem no rejectWithValue quando algo dá errado (rede fora, sessão do
 * Cloudflare Access expirada, resposta que não é JSON, status 4xx/5xx).
 */
const request = async (path, method = 'GET', data = null) => {
    let res

    try {
        res = await fetch(api + path, requestConfig(method, data))
    } catch (error) {
        // Sem rede, servidor fora ou redirecionamento para o login do Access
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
    getAssignmentById
}

export default taskService
