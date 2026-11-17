//dependencies
import { Request, Response } from "express";
import path from "path";

//repositories
import { createNewTask, deleteCreatedTask, updateTaskData, getAllTasks, createNewAssignment, updateAnAssignment, destroyAssignment, getAllAssignments, getAssignmentById, getTaskWithAttachments, createAttachments, getAttachmentById, getAttachmentsByTask, destroyAttachment } from "../repositories/TaskRepository.js";

//helpers
import { UPLOADS_DIR, decodeFileName, mimeTypeFor, removeStoredFiles } from "../helpers/upload.js";
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
        const attachments = await getAttachmentsByTask(Number(id))
        await deleteCreatedTask(Number(id))
        await removeStoredFiles(attachments.map((attachment) => attachment.storedName))
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
        const task = await getTaskWithAttachments(Number(id))

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

export async function getAssignmentId(req: Request, res: Response) {

    const { id } = req.params

    try {
        const assignment = await getAssignmentById(Number(id))

        res.status(200).json({
            msg: "Sucesso ao carregar pendência",
            data: assignment
        })

    } catch (error) {
        console.error("Erro ao encontrar pendência:", error)
        res.status(500).json({ errors: [`Não foi possível encontrar a pendência...`] })
    }

}

export async function uploadTaskAttachments(req: Request, res: Response) {
    const { id } = req.params
    const files = req.files as Express.Multer.File[]

    try {
        const attachments = await createAttachments(Number(id), files.map((file) => ({
            originalName: decodeFileName(file.originalname),
            storedName: file.filename,
            mimeType: mimeTypeFor(file.originalname),
            size: file.size
        })))

        res.status(201).json({
            msg: files.length === 1 ? "Anexo adicionado." : `${files.length} anexos adicionados.`,
            data: { taskId: Number(id), attachments }
        })
    } catch (error) {
        // Não deixa arquivo órfão na pasta se o banco falhar
        await removeStoredFiles(files.map((file) => file.filename))
        console.error("Erro ao salvar anexos:", error)
        res.status(500).json({ errors: [`Não foi possível salvar os anexos...`] })
    }
}

// Formatos que o navegador mostra direto; o resto é baixado
const INLINE_TYPES = ['image/', 'application/pdf', 'text/plain']

export async function getAttachmentFile(req: Request, res: Response) {
    const { id } = req.params

    try {
        const attachment = await getAttachmentById(Number(id))

        if (!attachment) {
            return res.status(404).json({ errors: ["Anexo não encontrado."] })
        }

        const inline = INLINE_TYPES.some((type) => attachment.mimeType.startsWith(type))
        const disposition = inline ? 'inline' : 'attachment'

        res.setHeader('Content-Type', attachment.mimeType)
        res.setHeader('Content-Disposition', `${disposition}; filename*=UTF-8''${encodeURIComponent(attachment.originalName)}`)
        res.setHeader('X-Content-Type-Options', 'nosniff')
        // O arquivo de um id nunca muda, então o navegador pode guardar
        res.setHeader('Cache-Control', 'private, max-age=31536000, immutable')

        res.sendFile(path.join(UPLOADS_DIR, path.basename(attachment.storedName)), (error) => {
            if (error && !res.headersSent) {
                console.error("Arquivo do anexo não encontrado no disco:", error)
                res.status(404).json({ errors: ["Arquivo do anexo não encontrado."] })
            }
        })
    } catch (error) {
        console.error("Erro ao abrir anexo:", error)
        res.status(500).json({ errors: [`Não foi possível abrir o anexo...`] })
    }
}

export async function deleteAttachment(req: Request, res: Response) {
    const { id } = req.params

    try {
        const attachment = await getAttachmentById(Number(id))
        await destroyAttachment(Number(id))

        if (attachment) await removeStoredFiles([attachment.storedName])

        res.status(200).json({
            msg: "Anexo removido.",
            data: { id: Number(id), taskId: attachment?.taskId ?? null }
        })
    } catch (error) {
        console.error("Erro ao remover anexo:", error)
        res.status(500).json({ errors: [`Não foi possível remover o anexo...`] })
    }
}
