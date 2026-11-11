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