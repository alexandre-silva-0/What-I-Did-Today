//dependencies
import { Request, Response } from "express";

//repositories
import { createNewTask, deleteCreatedTask, updateTaskData, getAllTasks, getTaskById, createNewAssignment, updateAnAssignment, destroyAssignment, getAllAssignments } from "../repositories/TaskRepository.js";
import { IUpdateTask } from "../dtos/tasks.dto.js";

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
        console.error("Erro ao registrar tarefa:", error)
        res.status(500).json({ errors: [`Não foi possível registrar a tarefa...`] })
    }
}

export async function updateTask(req: Request, res: Response) {
    const { id } = req.params

    const { content, startedAt, finishedAt } = req.body

    const updateData: IUpdateTask = {}
    if (content !== undefined) updateData.content = content;
    if (startedAt !== undefined) updateData.startedAt = startedAt;
    if (finishedAt !== undefined) updateData.finishedAt = finishedAt;

    try {
        const updatedTask = await updateTaskData(updateData, Number(id))
        res.status(200).json({ msg: 'Task atualizada', data: updatedTask })
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error)
        res.status(500).json({ errors: [`Não foi possível atualizar a tarefa...`] })
    }
}

export async function deleteTask(req: Request, res: Response) {
    const { id } = req.params

    try {
        await deleteCreatedTask(Number(id))
        res.status(200).json({ msg: "Task apagada com sucesso!", data: Number(id) })
    } catch (error) {
        console.error("Erro ao deletar tarefa:", error)
        res.status(500).json({ errors: [`Não foi possível deletar a tarefa...`] })
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
        console.error("Erro ao listar todas as tarefas:", error)
        res.status(500).json({ errors: [`Não foi possível listar todas as tarefas...`] })
    }

}

export async function getTaskId(req: Request, res: Response) {

    const { id } = req.params

    try {
        const task = await getTaskById(Number(id))

        res.status(200).json({
            msg: "Sucesso ao carregar tarefa",
            data: task
        })

    } catch (error) {
        console.error("Erro ao encontrar tarefa:", error)

        res.status(500).json({ errors: [`Não foi possível encontrar a tarefa...`] })
    }

}

export async function createAssignment(req: Request, res: Response) {
    const { content, status, deadline } = req.body

    const assignment = { content, status, deadline }

    try {
        const createdAssignment = await createNewAssignment(assignment)


        res.status(201).json({ msg: 'Pendência criada com sucesso.', data: createdAssignment })

    } catch (error) {
        console.error("Erro ao criar pendência:", error)
        res.status(500).json({ errors: [`Não foi possível criar uma pendência...`], })
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
        console.error("Erro ao editar pendência:", error)
        res.status(500).json({ errors: [`Não foi possível editar esta pendência...`], })
    }
}

export async function deleteAssignment(req: Request, res: Response) {

    const { id } = req.params

    try {

        await destroyAssignment(Number(id))

        res.status(200).json({ msg: "Pendência excluída com sucesso.", data: Number(id) })

    } catch (error) {
        console.error("Erro ao excluir pendência:", error)
        res.status(500).json({ errors: [`Não foi possível excluir esta pendência...`], })
    }
}

export async function getAssignments(req: Request, res: Response) {

    try {
        const assignments = await getAllAssignments()

        res.status(200).json({
            msg: "Sucesso ao carregar todas as pendências",
            data: assignments
        })

    } catch (error) {
        console.error("Erro ao carregar todas as pendências:", error)
        res.status(500).json({ errors: [`Não foi possível carregar todas as pendências...`] })
    }

}