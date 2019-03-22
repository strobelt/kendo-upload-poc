export interface Log {
    _id: string,
    method: string,
    url: string,
    params: string,
    body: string,
    userId: string,
    username: string,
    date: Date
}