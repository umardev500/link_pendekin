import React, { useEffect, useState } from 'react'
import { LinkCard } from '../components/LinkCard'
import { useAppDispatch } from '../store'
import { getLinks } from '../store/features'

export const Dashboard: React.FC = () => {
    const [data, setData] = useState<any[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await dispatch(getLinks()).unwrap()
                const status = response.status
                if (status === 'success') {
                    setData(response.data)
                }

                if (status !== 'success') setData([])
            } catch (err) {
                console.log(err)
            }
        }

        fetchData().catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <section id="hero" className="section-1">
            <div className="container">
                <div>
                    <div className="title text-center">
                        <h1>
                            <span className="highlight">History</span> link
                        </h1>
                    </div>

                    <div className="row justify-content-center">
                        {data.length > 0 &&
                            data.map((link, index) => {
                                return <LinkCard key={index} short={link.short} url={link.url} views={link.views} date={link.createdAt} />
                            })}
                    </div>
                </div>
            </div>
        </section>
    )
}
