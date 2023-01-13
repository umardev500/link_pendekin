import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import linkReducer from './features/linkSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
    reducer: {
        link: linkReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
