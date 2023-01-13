export const getToken = (): string | null => {
    const token = localStorage.getItem('token')
    return token
}

export const getUser = (): any => {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
}
