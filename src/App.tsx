import React, { useEffect, useState } from 'react'
import { Router } from './router'

function App(): React.ReactElement {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) return <div>Loading...</div>

    return (
        <div className="text-danger">
            <Router />
        </div>
    )
}

export default App
