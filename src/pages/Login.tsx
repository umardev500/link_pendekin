import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch } from '../store'
import { login, LoginProps } from '../store/features'

export const Login: React.FC = () => {
    const [email, setEmail] = useState('umar.dev500@gmail.com')
    const [password, setPassword] = useState('umardev')
    const toastLoadingRef = useRef<any>(null)
    const loadingToast = () => (toastLoadingRef.current = toast('Processing please wait...'))

    const dispatch = useAppDispatch()

    const loginHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const payload: LoginProps = {
            email,
            password,
        }

        const doing = async (): Promise<void> => {
            loadingToast()

            try {
                const response = await dispatch(login(payload)).unwrap()
                console.log(response)
                const status = response.status
                if (status === 'error') {
                    toast('Something went wrong.', { autoClose: 3000 })
                }
                if (status === 'success') {
                    toast('Login success.', { autoClose: 3000 })
                    const data = response.data
                    const token = data.token
                    const refreshToken = data.refreshToken
                    localStorage.setItem('token', token)
                    localStorage.setItem('refreshToken', refreshToken)
                    console.log(data)
                }

                toast.dismiss(toastLoadingRef.current)
            } catch (err) {
                toast.dismiss(toastLoadingRef.current)
                console.log(err)
            }
        }

        doing().catch((err) => {
            console.log(err)
        })
    }

    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1>
                            <span className="highlight">Masuk</span> sekarang
                        </h1>
                        <h1>Linkpendek.in</h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={loginHandler} method="post" autoComplete="off">
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        placeholder="Masukkan email"
                                    />
                                    {/* <p className="small text-danger mt-2">{ERRORS?.email?.message}</p> */}
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        placeholder="Masukkan password"
                                    />
                                    {/* <p className="small text-danger mt-2">{ERRORS?.password?.message}</p> */}
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-blue" disabled={false}>
                                        Masuk
                                    </button>
                                </div>
                            </form>
                            <p className="text-muted text-center mt-4">
                                Belum punya akun?{' '}
                                <Link to={'/register'} className="highlight">
                                    Daftar
                                </Link>{' '}
                                sekarang.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
