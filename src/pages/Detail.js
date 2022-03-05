import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import books from '../data/books'

const Detail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const index = books.findIndex(book => book.id == params.id)
    const book = books[index]
    const [alert, setAlert] = useState(false)

    const handleFavOnClick = e => {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (!favorites) {
            favorites = []
        }
        favorites.push(book)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setAlert(true)
    }

    const handleReadOnClick = e => {
        navigate('/read/' + params.id)
    }

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <Container>
                            <Row className='mt-5' >
                                {alert ? <Alert color='success' >ditambahkan ke favorit</Alert> : <></>}
                                <Col className='col-md-5' >
                                    <img src={'http://localhost:3000/' + book.img} alt="" style={{ width: '100%' }} />
                                </Col>
                                <Col>
                                    <div>
                                        <p ><span className='text-dark fw-bold fs-1' >{book.title} </span> <br />
                                            <span className='text-secondary' >{book.author} </span></p>
                                    </div>
                                    <br />
                                    <div>
                                        <p ><span className='text-dark fw-bold' >Publication date</span> <br />
                                            <span className='text-secondary' >April 2020</span></p>
                                    </div>
                                    <div>
                                        <p ><span className='text-dark fw-bold' >Pages</span> <br />
                                            <span className='text-secondary' >436</span></p>
                                    </div>
                                    <div>
                                        <p ><span className='text-danger fw-bold' >ISBN</span> <br />
                                            <span className='text-secondary' >9781789807554</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <h2 className='mt-lg-5 mb-lg-4' >About This Book</h2>
                            <p style={{ textAlign: 'justify' }} >
                                In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.
                                <br /><br />
                                Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.
                                <br /><br />
                                Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy.
                            </p>
                            <div className='text-end mb-5' >
                                <Button className='me-3' color='danger' onClick={handleFavOnClick}>
                                    Add My List <i className='fa-solid fa-bookmark' ></i>
                                </Button>
                                <Button className='me-3' onClick={handleReadOnClick} >
                                    Read Book <i className='fa-solid fa-chevron-right' ></i>
                                </Button>
                            </div>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default Detail