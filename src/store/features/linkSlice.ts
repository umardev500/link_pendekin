import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

    try {
        const response = await fetch('http://localhost:2000/links', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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
