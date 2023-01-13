import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import fieldErrors from '../helper/fieldErrors'
import { useAppDispatch, useAppSelector } from '../store'
import { createPostLink } from '../store/features/linkSlice'
import { Payload } from '../types'

export const Home: React.FC = () => {
    const [url, setUrl] = useState('http://google.com')
    const [short] = useState('')
    const [custom, setCustom] = useState(false)
    const toastLoading = React.useRef<any>(null)
    const loadingToast = () => (toastLoading.current = toast('Processing please wait....'))

    const link = useAppSelector((state) => state.link)
    const ERRORS = fieldErrors(link.message)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const createHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const payload: Payload = {
            url,
            short,
        }

        const doing = async (): Promise<void> => {
            try {
                loadingToast()
                const response = await dispatch(createPostLink(payload)).unwrap()
                const status = response.status
                if (status === 'error') {
                    toast.dismiss(toastLoading.current)
                    toast('Something went wrong.')
                    // console.log(response.message)
                }

                if (status === 'success') {
                    toast.dismiss(toastLoading.current)
                    toast('Link created', { autoClose: 2000 })
                    const shortKey = response.data.short as string
                    navigate(`/detail/${shortKey}`)
                }
                // console.log(response)
            } catch (err) {
                toast('something went wrong')
                console.log('something went wrong', err)
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
                            Pendekan <span className="highlight">linkmu</span> sekarang
                        </h1>
                        <h1>
                            Dengan sekali <span className="highlight">klik</span>
                        </h1>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={createHandler} method="post" autoComplete="off">
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="url"
                                        id="url"
                                        value={url}
                                        onChange={(e) => {
                                            setUrl(e.target.value)
                                        }}
                                        placeholder="Masukkan link panjang Anda"
                                    />
                                    <p className="small text-danger mt-2">{ERRORS?.url?.message}</p>
                                </div>
                                {/* {custom && (
                                    <div className="mb-4">
                                        <div className="d-flex align-items-center">
                                            <span className="text-white me-4">{process.env.REACT_APP_BACKEND_DOMAIN}/</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="short"
                                                id="short"
                                                value={short}
                                                onChange={(e) => setShort(e.target.value)}
                                                placeholder="Buat link pendek"
                                            />
                                        </div>
                                        <p className="small text-danger mt-2">{ERRORS?.short?.message}</p>
                                    </div>
                                )} */}
                                <div className="text-end">
                                    <p>
                                        Atau gunakan{' '}
                                        <span
                                            className="highlight pointer"
                                            onClick={() => {
                                                setCustom(!custom)
                                            }}
                                        >
                                            {custom ? `default ` : `custom `}link
                                        </span>
                                    </p>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-blue" disabled={false}>
                                        Pendekan
                                    </button>
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
