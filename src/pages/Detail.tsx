import { saveAs } from 'file-saver'
import React, { useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import copy from '../assets/img/copy.svg'
import qr from '../assets/img/qr-code.svg'
import formatDate from '../helper/formatDate'
import { useAppDispatch, useAppSelector } from '../store'
import { getLink } from '../store/features/linkSlice'

export const Detail: React.FC = () => {
    const params = useParams()
    const { short } = params
    const env = import.meta.env
    const protocol = env.VITE_REACT_APP_BACKEND_PROTOCOL as string
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string
    const shortLink = `${protocol}://${host}/${short as string}`

    const dispatch = useAppDispatch()
    const link = useAppSelector((state) => state.link)

    let qrLink: string = ''
    let fileName: string = ''
    let views: number = 0
    let createdAt: string = ''
    if (!link.error && link.data !== null) {
        const id = link.data.id
        qrLink = `${protocol}://${host}/images/qr/${id as string}.png`
        fileName = `qr-${id as string}.png`
        views = link.data.views
        createdAt = link.data.createdAt
    }

    const copied = (): void => {
        toast('Link copied to clipboard', { autoClose: 3000 })
    }

    const downloadImage = (): void => {
        // saveAs(qrLink, fileName)
        const fetchImage = async (): Promise<void> => {
            try {
                const response = await fetch(qrLink + 'sd')
                const statusCode = response.status

                if (statusCode === 200) {
                    const blob = await response.blob()
                    saveAs(blob, fileName)
                } else {
                    toast('Something went wrong...', { autoClose: 3000 })
                }
            } catch (err) {
                toast('Something went wrong...', { autoClose: 3000 })
            }
        }

        fetchImage().catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        dispatch(getLink(short as string)).catch((err) => {
            console.log(err)
        })
    }, [])

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
                                <p className="text-muted">Hits: {views}</p>
                                <p className="text-muted">Created: {createdAt !== '' ? formatDate(createdAt) : ''}</p>
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
                                                    <img src={qrLink} alt="" />
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
