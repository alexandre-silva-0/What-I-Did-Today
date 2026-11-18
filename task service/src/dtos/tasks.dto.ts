export interface ITask {
    content: string,
    date: string,
    startedAt: string,
    finishedAt?: string | null
}

export interface IUpdateTask {
    content?: string,
    date?: string,
    startedAt?: string,
    finishedAt?: string | null
}

export interface IAssignment {
    content: string,
    status: string,
    deadline?: string | null
}

export interface IUpdateAssignment {
    content?: string,
    status?: string,
    deadline?: string | null
}

export interface IAttachmentFile {
    originalName: string,
    storedName: string,
    mimeType: string,
    size: number
}
