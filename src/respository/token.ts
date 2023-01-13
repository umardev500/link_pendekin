export const getToken = (): string | null => {
    const token = localStorage.getItem('token')
    return token
}

export const getUser = (): any => {
    const user = localStorage.getItem('user')
    if (user == null) {
        return {}
    }

    return JSON.parse(user)
}
