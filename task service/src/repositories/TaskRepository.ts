//interfaces
import { IAssignment, IAttachmentFile, ITask, IUpdateAssignment, IUpdateTask } from "../dtos/tasks.dto.js";
import { Assignment } from "../models/Assignment.js";
import { Attachment } from "../models/Attachment.js";

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

// Tarefa com a lista de anexos (para a tela de edição)
export const getTaskWithAttachments = async (id: number) => {
    return await Task.findByPk(id, { include: [Attachment] })
}

export const updateTaskData = async (data: IUpdateTask, id: number) => {
    await Task.update(data, { where: { id } })
    return getTaskWithAttachments(id)
}

export const deleteCreatedTask = async (id: number) => {
    await Task.destroy({ where: { id } })
    return
}

export const getAllTasks = async () => {
    return await Task.findAll({ include: [Attachment], order: [['createdAt', 'DESC']] })
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

export const createAttachments = async (taskId: number, files: IAttachmentFile[]) => {
    return await Attachment.bulkCreate(files.map((file) => ({ ...file, taskId })))
}

export const getAttachmentById = async (id: number) => {
    return await Attachment.findByPk(id, { raw: true })
}

export const getAttachmentsByTask = async (taskId: number) => {
    return await Attachment.findAll({ where: { taskId }, raw: true })
}

export const destroyAttachment = async (id: number) => {
    await Attachment.destroy({ where: { id } })
    return
}
