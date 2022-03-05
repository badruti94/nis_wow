import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { Col, Container } from 'reactstrap'
import Sidebar from '../components/Sidebar'

const Read = () => {
    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
        setLocation(epubcifi)
    }

    return (
        <div style={{ height: "100vh" }}>
            <ReactReader
                location={location}
                locationChanged={locationChanged}
                url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
            />
        </div>
    )
}

export default Read