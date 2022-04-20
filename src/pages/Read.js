import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'

const Read = () => {
    const params = useParams()
    const [location, setLocation] = useState(null)
    const [bookFile, setBookFile] = useState("")
    const locationChanged = (epubcifi) => {
        setLocation(epubcifi)
    }

    try {
        (async () => {
            const response = await API.get(`/book/${params.id}`);
            setBookFile(response.data.data.book.bookFile);
        })()
    } catch (error) {
        console.log(error);
    }

    return (
        <div style={{ height: "100vh" }}>
            <ReactReader
                location={location}
                locationChanged={locationChanged}
                url={'http://localhost:3000/uploads/' + bookFile}
            />
        </div>
    )
}

export default Read