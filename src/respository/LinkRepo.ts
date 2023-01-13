import { Payload } from '../types'

export const createLink = async (data: Payload): Promise<void> => {
    await fetch('http://localhost:2000/links', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}
