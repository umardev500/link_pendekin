import React from 'react'
import { HashRouter as RouterRoot, Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { GuestRoute, ProtectedRoute } from '../middleware'
import { Detail, Edit, Home, Login, Register } from '../pages'
import { Dashboard } from '../pages/Dashboard'

export const Router = (): React.ReactElement => {
    return (
        <RouterRoot>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/detail/:short" element={<Detail />} />
                <Route path="/edit/:short" element={<Edit />} />
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <Register />
                        </GuestRoute>
                    }
                />
            </Routes>
        </RouterRoot>
    )
}
