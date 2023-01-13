import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getToken } from '../../respository'
import { linkResponse, Payload } from '../../types'

const initialState: linkResponse = {
    error: false,
    message: [],
    data: null,
}

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
            Authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoidW1hciIsImVtYWlsIjoidW1hci5kZXY1MDBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaFhXSWZtNVZELmNmNnkwVEdzbk5kTzdFUWtsVjJ1aVdMbHpVcFRrNkJyZWVrZ250a0tCLmEiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTEzVDE3OjIwOjIyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTEzVDE3OjIwOjIyLjAwMFoifSwiaWF0IjoxNjczNjMzMTc5LCJleHAiOjE2NzM4MDU5Nzl9.keJAbctnAqqk-bYBmMtgC2_SmbRK2jvYTVMM08PF7xw',
        }
    }

    try {
        const response = await fetch('http://localhost:2000/links', {
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
    const target = `http://localhost:2000/links/${short}`

    try {
        const response = await fetch(target)
        const data = await response.json()

        return data
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const getLinks = createAsyncThunk('link/getLinks', async (props, { rejectWithValue }) => {
    const target = `http://localhost:2000/links`

    try {
        const response = await fetch(target, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoidW1hciIsImVtYWlsIjoidW1hci5kZXY1MDBAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaFhXSWZtNVZELmNmNnkwVEdzbk5kTzdFUWtsVjJ1aVdMbHpVcFRrNkJyZWVrZ250a0tCLmEiLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTEzVDE3OjIwOjIyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTEzVDE3OjIwOjIyLjAwMFoifSwiaWF0IjoxNjczNjMzMTc5LCJleHAiOjE2NzM4MDU5Nzl9.keJAbctnAqqk-bYBmMtgC2_SmbRK2jvYTVMM08PF7xw',
            },
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
