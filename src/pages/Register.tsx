import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch } from '../store'
import { register, RegisterProps } from '../store/features'

export const Register: React.FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toastLoading = React.useRef<any>(null)
    const loadingToast = () => (toastLoading.current = toast('Processing please wait....'))

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const payload: RegisterProps = {
            name,
            email,
            password,
        }

        const reg = async (): Promise<void> => {
            loadingToast()
            try {
                const response = await dispatch(register(payload)).unwrap()
                const status = response.status

                if (status === 'success') {
                    toast('Account created.', { autoClose: 3000 })

                    navigate('/login')
                }
                if (status !== 'success') {
                    const messages: any[] = response.message
                    messages.forEach((val, index) => {
                        toast(val.message, { autoClose: 3000 + 1000 * index })
                    })
                }
            } catch (err) {
                console.log(err)
                toast('Something went wrong.')
            } finally {
                toast.dismiss(toastLoading.current)
            }
        }

        reg().catch((err) => {
            console.log(err)
        })
    }

    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1>
                            <span className="highlight">Daftar</span> sekarang
                        </h1>
                        <h1>Linkpendek.in</h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={registerHandler} method="post" autoComplete="off">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        placeholder="Masukkan nama"
                                    />
                                    {/* <p className="small text-danger mt-2">{ERRORS?.name?.message}</p> */}
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="text"
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
                                        Daftar
                                    </button>
                                </div>
                            </form>
                            <p className="text-muted text-center mt-4">
                                Sudah punya akun?{' '}
                                <Link to={'/login'} className="highlight">
                                    Masuk
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
