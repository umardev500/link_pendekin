import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'

export const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <img src={logo} alt="" />
                </Link>
                <div className="ms-auto">
                    {/* {props.user.data && props.user.data.id ? (
                        <div className="d-flex">
                            <Link className="mb-0 me-2 text-white" to={'/dashboard'}>
                                {props.user.data.email}
                            </Link>
                            <button onClick={logout} className="no-btn" disabled={props.user.loading}>
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
                    )} */}
                </div>
            </div>
        </nav>
    )
}
