import React, { useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import copy from '../assets/img/copy.svg'
import qr from '../assets/img/qr-code.svg'

export const Detail: React.FC = () => {
    const params = useParams()
    const { short } = params
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const shortLink = `${protocol}://${host}/${short as string}`

    const copied = (): void => {
        toast('Link copied to clipboard')
    }

    const downloadImage = (): void => {}

    useEffect(() => {}, [])

    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1>
                            <span className="highlight">Detail</span> link
                        </h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <div className="d-flex justify-content-between">
                                <p className="text-muted">Hits: 1212</p>
                                <p className="text-muted">Created: Sep 23, 2023</p>
                            </div>
                            <form autoComplete="off">
                                <div className="input-group mb-5">
                                    <input type="text" className="form-control" value={shortLink} disabled aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">
                                        <CopyToClipboard text={shortLink}>
                                            <img onClick={copied} src={copy} alt="" />
                                        </CopyToClipboard>
                                    </span>
                                    <span className="input-group-text" id="basic-addon2">
                                        <button className="no-btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <img src={qr} alt="" />
                                        </button>
                                    </span>

                                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        QR CODE
                                                    </h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body text-center">
                                                    <img src={qr} alt="" />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button type="button" onClick={downloadImage} className="btn btn-primary">
                                                        Download
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a href={shortLink} target="_blank" className="btn btn-blue" rel="noreferrer">
                                        Menuju link
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
