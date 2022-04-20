import React, { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'reactstrap'
import List from '../components/List'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const Home = () => {
    const [alert, setAlert] = useState(false)
    const [books, setBooks] = useState()

    useEffect(() => {
        try {
            (async () => {
                const response = await API.get("/books");
                setBooks(response.data.data.books);
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Card className='shadow mt-5' style={{ width: '900px' }} >
                        <img src="/subcribe-now.png" alt="" />
                    </Card>
                    <h2 className='mt-4 mb-4' >List Book</h2>
                    {alert ? <Alert color='danger'>Please make payment to read latest book</Alert> : <></>}
                    <Row style={{ width: '900px' }} >
                        {
                            books && books.map(book =>
                                <List
                                    key={book.id}
                                    id={book.id}
                                    img={book.cover}
                                    title={book.title}
                                    author={book.author}
                                    setAlert={setAlert}
                                />)
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Home