import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getToken, getUser } from '../../respository'

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

export interface RegisterProps {
    name: string
    email: string
    password: string
}

export const register = createAsyncThunk('auth/register', async ({ name, email, password }: RegisterProps, { rejectWithValue }) => {
    const target = `http://localhost:2000/auth/register`
    const bodyReq: RegisterProps = {
        name,
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

        return await response.json()
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState = {
    token: getToken(),
    user: getUser(),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, value) => {
            const payload = value.payload
            const status = payload.status
            if (status === 'success') {
                const data = payload.data
                const token = data.token
                state.token = token
            }

            console.log('value', value)
        })
    },
})

export const { setUser, logoutUser } = authSlice.actions
export default authSlice.reducer
