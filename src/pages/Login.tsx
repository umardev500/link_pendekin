import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (): void => {}

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
        </section>
    )
}
