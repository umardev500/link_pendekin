import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    short: string
    url: string
    views: number
    date: string
}

export const LinkCard: React.FC<Props> = ({ short, url, views, date }) => {
    const env = import.meta.env
    const host = env.VITE_REACT_APP_BACKEND_DOMAIN as string

    return (
        <div className="col-md-4 mb-4">
            <div className="link-card">
                <p className="highlight bold mb-3">
                    <strong>
                        {host}/{short}
                    </strong>
                </p>
                <p className="mb-2">Link: {url}</p>
                <p className="mb-2">Created {date}</p>
                <p className="mb-2">Hits: {views}</p>
                <div className="mt-3">
                    <Link to={`/detail/${short}`} className="btn btn-blue mb-2 me-2">
                        Detail
                    </Link>
                    <Link to={`/edit/${short}`} className="btn btn-blue mb-2">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    )
}
