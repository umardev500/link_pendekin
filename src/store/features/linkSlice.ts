import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getToken } from '../../respository'
import { linkResponse, Payload } from '../../types'

const initialState: linkResponse = {
    error: false,
    message: [],
    data: null,
}

export interface UpdatePropsType {
    data: Payload
    id: string
}
export const updateLink = createAsyncThunk('link/updateLink', async ({ data, id }: UpdatePropsType, { rejectWithValue }) => {
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const target = `${protocol}://${host}/links/${id}`
    let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const token = getToken()
    if (token !== null) {
        headers = {
            ...headers,
            Authorization: getToken(),
        }
    }

    const requestBody: Payload = {
        url: data.url,
        short: data.short,
    }

    try {
        const response = await fetch(target, {
            method: 'PUT',
            headers,
            body: JSON.stringify(requestBody),
        })

        return await response.json()
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const createPostLink = createAsyncThunk('link/createLink', async ({ url, short }: Payload, { rejectWithValue }) => {
    const requestBody: Payload = {
        url,
        short,
    }

    let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const token = getToken()
    if (token !== null) {
        headers = {
            ...headers,
            Authorization: getToken(),
        }
    }

    try {
        const env = import.meta.env
        const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
        const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
        const target = `${protocol}://${host}/links`
        const response = await fetch(target, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
        })

        return await response.json()
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getLink = createAsyncThunk('link/getLink', async (short: string, { rejectWithValue }) => {
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const target = `${protocol}://${host}/links/${short}`

    try {
        const response = await fetch(target)
        const data = await response.json()

        return data
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getLinks = createAsyncThunk('link/getLinks', async (props, { rejectWithValue }) => {
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const target = `${protocol}://${host}/links`
    let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    const token = getToken()
    if (token !== null) {
        headers = {
            ...headers,
            Authorization: getToken(),
        }
    }

    try {
        const response = await fetch(target, {
            method: 'GET',
            headers,
        })

        return await response.json()
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPostLink.fulfilled, (state, value) => {
                const payload = value.payload
                const status = payload.status
                if (status === 'error') {
                    state.error = true
                    state.message = payload.message
                }

                if (status === 'success') {
                    state.error = false
                    state.message = []
                }
            })
            .addCase(createPostLink.rejected, (state, value) => {
                console.log('rejected')
            })
            .addCase(getLink.fulfilled, (state, value) => {
                const payload = value.payload
                const status = payload.status
                if (status === 'error') {
                    state.error = true
                    state.message = payload.message
                }

                if (status === 'success') {
                    state.error = false
                    state.message = []
                    state.data = payload.data
                }
            })
    },
})

export default linkSlice.reducer
