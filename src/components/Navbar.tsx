import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'
import logoLogout from '../assets/img/logout.svg'
import { useAppSelector } from '../store'

export const Navbar: React.FC = () => {
    const auth = useAppSelector((state) => state.auth)
    const data = auth.user

    const logout = (): void => {}

    return (
        <nav className="navbar navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <img src={logo} alt="" />
                </Link>
                <div className="ms-auto">
                    {data !== null ? (
                        <div className="d-flex">
                            <Link className="mb-0 me-2 text-white" to={'/dashboard'}>
                                {data.email}
                            </Link>
                            <button onClick={logout} className="no-btn" disabled={false}>
                                <img src={logoLogout} alt="" />
                            </button>
                        </div>
                    ) : location.pathname === '/login' ? (
                        <Link to={'/register'} className="btn btn-red">
                            Daftar
                        </Link>
                    ) : (
                        <Link to={'/login'} className="btn btn-red">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
