//Dependencies
import { Router } from "express";

//controllers
import {
    createTask, updateTask, deleteTask,
    getTasks, getTaskId, createAssignment, updateAssignment, deleteAssignment,
    getAssignments, getAssignmentId,
    uploadTaskAttachments, getAttachmentFile, deleteAttachment
} from "../controller/TaskController.js";

//helpers
import {
    createTaskValidation, updateTaskValidation, deleteTaskValidation, getTaskValidation,
    uploadAttachmentsValidation, attachmentIdValidation
} from "../helpers/task-validators.js";
import { uploadFiles } from "../helpers/upload.js";
import { validate } from "../helpers/handle-validations.js";
import {
    createAssignmentValidation, updateAssignmentValidation, deleteAssignmentValidation, getAssignmentValidation
} from "../helpers/assignment-validators.js";

const router = Router()

router.post('/api/tasks', createTaskValidation, validate, createTask)
router.patch('/api/tasks/:id', updateTaskValidation, validate, updateTask)
router.delete('/api/tasks/:id', deleteTaskValidation, validate, deleteTask)
router.get('/api/tasks', getTasks)
router.get('/api/tasks/:id', getTaskValidation, validate, getTaskId)

// Anexos (só tarefas): o :id é validado antes de receber os arquivos
router.post('/api/tasks/:id/attachments', uploadAttachmentsValidation, validate, uploadFiles, uploadTaskAttachments)
router.get('/api/attachments/:id/file', attachmentIdValidation, validate, getAttachmentFile)
router.delete('/api/attachments/:id', attachmentIdValidation, validate, deleteAttachment)
router.post('/api/assignments', createAssignmentValidation, validate, createAssignment)
router.patch('/api/assignments/:id', updateAssignmentValidation, validate, updateAssignment)
router.delete('/api/assignments/:id', deleteAssignmentValidation, validate, deleteAssignment)
router.get('/api/assignments', getAssignments)
router.get('/api/assignments/:id', getAssignmentValidation, validate, getAssignmentId)

export default router  