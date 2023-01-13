import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Detail, Edit, Home, Login, Register } from '../pages'
import { Dashboard } from '../pages/Dashboard'

export const Router = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}
