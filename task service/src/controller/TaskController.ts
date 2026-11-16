//dependencies
import { Request, Response } from "express";

//repositories
import { createNewTask, deleteCreatedTask, updateTaskData, getAllTasks, getTaskById, createNewAssignment, updateAnAssignment, destroyAssignment } from "../repositories/TaskRepository.js";

export async function createTask(req: Request, res: Response) {
    const { content, startedAt, finishedAt } = req.body

    const task = {
        content, startedAt, finishedAt
    }

    try {
        const createdTask = await createNewTask(task)

        res.status(201).json({
            msg: "Tarefa registrada com sucesso!",
            data: createdTask
        })
    } catch (error) {
        res.status(500).json({ error: error })
        console.error('Não foi possível registrar a atividade...', error)
    }
}

export async function updateTask(req: Request, res: Response) {
    const { id } = req.params

    if (typeof (id) !== "string") return res.status(400).json({ error: "ID inválido" })

    const { content, startedAt, finishedAt } = req.body

    const updateData: Record<string, string> = {}
    if (content !== undefined) updateData.content = content;
    if (startedAt !== undefined) updateData.startedAt = startedAt;
    if (finishedAt !== undefined) updateData.finishedAt = finishedAt;

    try {
        const updatedTask = await updateTaskData(updateData, parseInt(id))
        res.status(200).json({ msg: 'Task atualizada', data: updatedTask })
    } catch (error) {
        console.error("Não foi possível atualizar a task... ", error)
    }
}

export async function deleteTask(req: Request, res: Response) {
    const { id } = req.params
    if (typeof (id) !== "string") return res.status(400).json({ error: "ID inválido" })

    try {
        await deleteCreatedTask(parseInt(id))
        res.status(200).json({ msg: "Task apagada com sucesso!", id: id })
    } catch (error) {
        console.error("Não foi possível apagar task... ", error)
    }
}

export async function getTasks(req: Request, res: Response) {

    try {

        const tasks = await getAllTasks()

        res.status(200).json({
            msg: "Sucesso ao carregar todas as tarefas",
            data: tasks
        })

    } catch (error) {
        console.error("Não foi possível listar todas as tarefas. ", error)
    }

}

export async function getTaskId(req: Request, res: Response) {

    let { id } = req.params

    try {
        const task = await getTaskById(Number(id))

        res.status(200).json({
            msg: "Sucesso ao carregar tarefa",
            data: task
        })

    } catch (error) {
        console.error("Não foi possível localizar tarefa. ", error)
    }

}

export async function createAssignment(req: Request, res: Response) {
    const { content, status, deadline } = req.body

    const assignment = { content, status, deadline }

    try {
        const createdAssignment = await createNewAssignment(assignment)


        res.status(201).json({ msg: 'Pendência criada com sucessso.', data: createdAssignment })

    } catch (error) {
        res.status(500).json({ error: `Não foi possível criar uma pendência... ${error}`, })
    }
}

export async function updateAssignment(req: Request, res: Response) {

    const { id } = req.params
    const { content, status, deadline } = req.body

    const assignment = { content, status, deadline }

    try {

        const updatedAssignment = await updateAnAssignment(assignment, Number(id))

        res.status(200).json({ msg: "Pendência atualizada.", data: updatedAssignment })

    } catch (error) {
        res.status(500).json({ error: `Não foi possível editar está pendência... ${error}`, })
    }
}

export async function deleteAssignment(req: Request, res: Response) {

    const { id } = req.params

    try {

        await destroyAssignment(Number(id))

        res.status(200).json({ msg: "Pendência excluída com sucesso.", data: { id: id } })

    } catch (error) {
        res.status(500).json({ error: `Não foi possível excluir está pendência... ${error}`, })
    }

}