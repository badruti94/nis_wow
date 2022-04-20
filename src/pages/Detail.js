import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Col, Container, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const Detail = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState()
    const [alert, setAlert] = useState({
        display: false,
        color: '',
        message: ""
    })
    const [isFavorite, setIsFavorite] = useState(false)

    const userId = JSON.parse(localStorage.getItem('user')).id

    const checkIsFavorite = async () => {
        const response = await API.get(`user/${userId}/favorite/${params.id}`);
        setIsFavorite(response.data.data)
    }

    useEffect(() => {
        try {
            (async () => {
                const response = await API.get(`/book/${params.id}`);
                setBook(response.data.data.book);
            })()
            checkIsFavorite()
        } catch (error) {
            console.log(error);
        }

    }, [])

    const handleFavOnClick = e => {
        (async () => {
            let token;
            try {
                token = JSON.parse(localStorage.token)
            } catch (error) {
                token = localStorage.token

            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };

            const body = JSON.stringify({ bookId: params.id });
            try {
                await API.post(`user/${userId}/favorite`, body, config);
                checkIsFavorite()
                setAlert({
                    display: true,
                    color: 'success',
                    message: "Add to List"
                })
            } catch (error) {
                setAlert({
                    display: true,
                    color: 'danger',
                    message: error.response.data.message
                })
            }
        })()
    }

    const handleDeleteFav = () => {
        (async () => {
            let token;
            try {
                token = JSON.parse(localStorage.token)
            } catch (error) {
                token = localStorage.token

            }
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };

            try {
                await API.delete(`user/favorite/${userId}/${params.id}`, config);
                checkIsFavorite()
                setAlert({
                    display: true,
                    color: 'success',
                    message: "Delete from List"
                })
            } catch (error) {
                setAlert({
                    display: true,
                    color: 'danger',
                    message: error.response.data.message
                })
            }
        })()
    }

    const handleReadOnClick = () => {
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
                                {alert.display ? <Alert color={alert.color} >{alert.message}</Alert> : <></>}
                                <Col className='col-md-5' >
                                    <img src={'http://localhost:3000/uploads/' + book?.cover} alt="" style={{ width: '100%' }} />
                                </Col>
                                <Col>
                                    <div>
                                        <p ><span className='text-dark fw-bold fs-1' >{book?.title} </span> <br />
                                            <span className='text-secondary' >{book?.author} </span></p>
                                    </div>
                                    <br />
                                    <div>
                                        <p ><span className='text-dark fw-bold' >Publication date</span> <br />
                                            <span className='text-secondary' >{book?.publicationDate}</span></p>
                                    </div>
                                    <div>
                                        <p ><span className='text-dark fw-bold' >Pages</span> <br />
                                            <span className='text-secondary' >{book?.pages}</span></p>
                                    </div>
                                    <div>
                                        <p ><span className='text-danger fw-bold' >ISBN</span> <br />
                                            <span className='text-secondary' >{book?.isbn}</span></p>
                                    </div>
                                </Col>
                            </Row>
                            <h2 className='mt-lg-5 mb-lg-4' >About This Book</h2>
                            <p style={{ textAlign: 'justify' }} >{book?.about}</p>
                            <div className='text-end mb-5' >
                                {!isFavorite ?
                                    <Button className='me-3' color='danger' onClick={handleFavOnClick}>
                                        Add My List <i className='fa-solid fa-bookmark' ></i>
                                    </Button>
                                    :
                                    <Button className='me-3' color='danger' onClick={handleDeleteFav}>
                                        Delete from My List <i className='fa-solid fa-trash' ></i>
                                    </Button>}
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