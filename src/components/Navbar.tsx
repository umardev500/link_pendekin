import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo-2.png'
import logoLogout from '../assets/img/logout.svg'
import { useAppDispatch, useAppSelector } from '../store'
import { logoutUser } from '../store/features'

export const Navbar: React.FC = () => {
    const auth = useAppSelector((state) => state.auth)
    const data = auth.user

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logout = (): void => {
        dispatch(logoutUser())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    console.log(location)

    return (
        <nav className="navbar navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <img src={logo} alt="" />
                </Link>
                <div className="ms-auto">
                    {data?.id !== undefined ? (
                        <div className="d-flex">
                            <Link className="mb-0 me-2 text-white" to={'/dashboard'}>
                                {data.email}
                            </Link>
                            <button onClick={logout} className="no-btn" disabled={false}>
                                <img src={logoLogout} alt="" />
                            </button>
                        </div>
                    ) : (
                        <>
                            {location.hash !== '#/register' && location.hash !== '#/login' ? (
                                <Link to={'/login'} className="btn btn-red">
                                    Login
                                </Link>
                            ) : null}

                            {location.hash === '#/register' ? (
                                <Link to={'/login'} className="btn btn-red">
                                    Login
                                </Link>
                            ) : null}

                            {location.hash === '#/login' ? (
                                <Link to={'/register'} className="btn btn-red">
                                    Register
                                </Link>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
