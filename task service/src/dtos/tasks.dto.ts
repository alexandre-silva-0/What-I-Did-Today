export interface ITask {
    content: string,
    startedAt: string,
    finishedAt?: string
}

export interface IUpdateTask {
    content?: string,
    startedAt?: string,
    finishedAt?: string
}

export interface IAssignment {
    content: string,
    status: string,
    deadline?: string
}

export interface IUpdateAssignment {
    content?: string,
    status?: string,
    deadline?: string
}