export interface IResponse<T>{
    statusCode: number,
    message: string,
    data?: T
}

export interface IDataUser{
    user: { 
        id?: number,
        name?: string,
        email?: string
    },
    AT?: string
}