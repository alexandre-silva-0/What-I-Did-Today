//interfaces
import { IAssignment, ITask, IUpdateAssignment, IUpdateTask } from "../dtos/tasks.dto.js";
import { Assignment } from "../models/Assignment.js";

//models
import { Task } from "../models/Task.js";


export const createNewTask = async (task: ITask) => {
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
    await Task.update(data, { where: { id } })
    return Task.findByPk(id, { raw: true })
}

export const deleteCreatedTask = async (id: number) => {
    await Task.destroy({ where: { id } })
    return
}

export const getAllTasks = async () => {
    return await Task.findAll({ raw: true, order: [['createdAt', 'DESC']] })
}

export const createNewAssignment = async (assignment: IAssignment) => {
    return await Assignment.create({
        content: assignment.content,
        status: assignment.status,
        deadline: assignment.deadline
    })
}

export const updateAnAssignment = async (assignment: IUpdateAssignment, id: number) => {
    await Assignment.update(assignment, { where: { id } })
    return Assignment.findByPk(id, { raw: true })
}

export const destroyAssignment = async (id: number) => {
    await Assignment.destroy({ where: { id } })
    return
}

export const getAllAssignments = async () => {
    return await Assignment.findAll({ raw: true, order: [['createdAt', 'DESC']] })
}

export const getAssignmentById = async (id: number) => {
    return await Assignment.findByPk(id, { raw: true })
}
