import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import { useAppDispatch } from '../store'
import { getLink, updateLink } from '../store/features'
import { Payload } from '../types'

export const Edit: React.FC = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShort] = useState('')
    const [id, setId] = useState('')

    const navigate = useNavigate()
    const params = useParams()
    const { short } = params
    const toastLoading = React.useRef<any>(null)
    const loadingToast = () => (toastLoading.current = toast('Processing please wait....'))

    const dispatch = useAppDispatch()

    const updateHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        loadingToast()
        const payload: Payload = {
            url,
            short: shortUrl,
        }

        console.log(payload)

        const update = async (): Promise<void> => {
            try {
                const response = await dispatch(updateLink({ data: payload, id }))
                const payloads = response.payload
                const status = payloads.status
                if (status === 'success') {
                    toast('Link updated.', { autoClose: 3000 })
                    navigate(`/dashboard`)
                }
                if (status !== 'success') {
                    console.log('error here', status)
                    const messages: any[] = payloads.message
                    messages.forEach((val) => {
                        toast(val.message, { autoClose: 3000 })
                    })
                }
            } catch (err) {
                console.log(err)
                toast('Something went wrong.')
            } finally {
                toast.dismiss(toastLoading.current)
            }
        }

        update().catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const fetchLink = async (): Promise<void> => {
            try {
                const response = await dispatch(getLink(short as string))
                const payload = response.payload
                const status = payload.status
                if (status === 'success') {
                    const data = payload.data
                    setUrl(data.url)
                    setShort(data.short)
                    setId(data.id.toString())
                }

                if (status !== 'success') {
                    setUrl('')
                    setShort('')
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetchLink().catch((err) => {
            console.log(err)
        })
    }, [])

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
                                            defaultValue={url}
                                            onChange={(e) => {
                                                setUrl(e.target.value)
                                            }}
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
                                                defaultValue={shortUrl}
                                                onChange={(e) => {
                                                    setShort(e.target.value)
                                                }}
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
                <ToastContainer />
            </section>
        </div>
    )
}
