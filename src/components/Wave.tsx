import React from 'react'
import wave from '../assets/img/wave.svg'

export const Wave: React.FC = () => {
    return (
        <div className="position-relative">
            <img className="wave" src={wave} alt="" />
        </div>
    )
}

export default Wave
