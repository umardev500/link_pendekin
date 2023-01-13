import React from 'react'

export const Dashboard: React.FC = () => {
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
                        {/* {props.links.length > 0 &&
                            props.links.map((link, index) => {
                                return <LinkCard key={index} short={link.short} url={link.url} views={link.views} date={link.createdAt} />
                            })} */}
                    </div>
                </div>
            </div>
        </section>
    )
}
