export interface HTTPOk {
    data: any
    message: string
    status: number
}

export interface HTTPError {
    message: any
    status: number
}

export interface ConditionHTTPFeedback {
    message: string | string[] | undefined
    status: number | undefined
}