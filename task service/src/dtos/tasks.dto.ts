export interface ITask {
    content: string,
    startedAt: string,
    finishedAt?: string | null
}

export interface IUpdateTask {
    content?: string,
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