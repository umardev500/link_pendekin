import React from 'react'

export const Edit: React.FC = () => {
    const updateHandler = (): void => {}

    return (
        <div>
            <section id="hero" className="section-1">
                <div className="container">
                    <div>
                        <div className="title text-center">
                            <h1>
                                <span className="highlight">Edit</span> link
                            </h1>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="col-md-8">
                                <form onSubmit={updateHandler} method="post" autoComplete="off">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="url"
                                            id="url"
                                            defaultValue={'default value'}
                                            onChange={(e) => {}}
                                            placeholder="Masukkan link panjang Anda"
                                        />
                                        {/* <p className="text-danger">{ERRORS?.url?.message}</p> */}
                                    </div>
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center">
                                            {/* <span className="text-white me-4">{process.env.REACT_APP_BACKEND_DOMAIN}/</span> */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="short"
                                                id="short"
                                                defaultValue={'default value'}
                                                onChange={(e) => {}}
                                                placeholder="Buat link pendek"
                                            />
                                        </div>
                                        {/* <p className="small text-danger mt-2">{ERRORS?.short?.message}</p> */}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-blue" disabled={false}>
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
