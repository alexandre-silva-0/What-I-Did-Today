//interfaces
import { ITask, IUpdateTask } from "../dtos/tasks.dto.js";

//models
import { Task } from "../models/Task.js";


export const createNewTask = async (task: ITask) => {
    console.log(task)
    return await Task.create({
        content: task.content,
        startedAt: task.startedAt,
        finishedAt: task.finishedAt
    })
}

export const getTaskById = async (id: number) => {
    return await Task.findOne({ where: { id }, raw: true })
}

export const updateTaskData = async (data: IUpdateTask, id: number) => {
    return await Task.update(data, { where: { id } })
}

export const deleteCreatedTask = async (id: number) => {
    await Task.destroy({ where: { id } })
    return
}