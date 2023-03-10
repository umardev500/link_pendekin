import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getToken } from '../respository'

interface Props {
    children?: React.ReactElement
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const token = getToken()
    const navigate = useNavigate()

    // const token = auth.token
    if (token === null) {
        useEffect(() => {
            navigate('/login')
        }, [])
        return null
    } else {
        return <>{children}</>
    }
}

export const GuestRoute: React.FC<Props> = ({ children }) => {
    const token = getToken()
    const navigate = useNavigate()

    if (token !== null) {
        useEffect(() => {
            navigate('/dashboard')
        }, [])

        return null
    } else {
        return <>{children}</>
    }
}
