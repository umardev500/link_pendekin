import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface LoginProps {
    email: string
    password: string
}
export const login = createAsyncThunk('auth/login', async ({ email, password }: LoginProps, { rejectWithValue }) => {
    const target = `http://localhost:2000/auth/login`
    const bodyReq = {
        email,
        password,
    }

    try {
        const response = await fetch(target, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyReq),
        })

        const data = await response.json()
        return data
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState = {}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, value) => {
            console.log(value)
        })
    },
})