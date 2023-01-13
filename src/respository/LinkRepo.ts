import { Payload } from '../types'

export const createLink = async (data: Payload): Promise<void> => {
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const target = `${protocol}://${host}/links`
    await fetch(target, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}
