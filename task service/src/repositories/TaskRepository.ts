import { ITask } from "../dtos/tasks.dto.js";
import { Task } from "../models/Task.js";


export const createTask = async (task: ITask) => {
    await Task.create({ task })
}