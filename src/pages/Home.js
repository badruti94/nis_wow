import React, { useState } from 'react'
import { Alert, Card, CardBody, Col, Container, Row } from 'reactstrap'
import List from '../components/List'
import Sidebar from '../components/Sidebar'
import books from '../data/books'
import subcribeNow from './subcribe-now.png'



const Home = () => {
    const [alert, setAlert] = useState(false)

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Card className='shadow mt-5' style={{ width: '900px' }} >
                        <img src={subcribeNow} alt="" />
                    </Card>
                    <h2 className='mt-4 mb-4' >List Book</h2>
                    {alert ? <Alert color='danger'>please make payment to read latest book</Alert> : <></>}
                    <Row>
                        {
                            books.map(book =>
                                <List
                                    id={book.id}
                                    img={book.img}
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