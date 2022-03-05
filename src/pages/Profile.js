import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'reactstrap'
import List from '../components/List'
import Sidebar from '../components/Sidebar'
import myImg from './my-img.jpg'

const Data = (props) => {
    const { icon, label, value } = props
    return (
        <Row className='text-secondary' >
            <Col className='col-sm-1 me-1' ><i className={`fa-solid ${icon} fa-2x mt-2`} style={{ width: '200px' }} ></i></Col>
            <Col>
                <p><span className='text-dark fw-bold' >{value}</span> <br />
                    {label}</p>
            </Col>
        </Row>
    )
}

const Profile = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const favoritesFromLocalStorage = JSON.parse(localStorage.getItem('favorites'))
        if (favoritesFromLocalStorage) {
            setFavorites(favoritesFromLocalStorage)
        }

    }, [])

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <h2 className='mt-4 mb-4' >Profile</h2>
                    <Alert color='danger' >
                        <Container>
                            <Row>
                                <Col>
                                    <Data
                                        icon={'fa-envelope'}
                                        label={'Email'}
                                        value={'egigans@gmail.com'}
                                    />
                                    <Data
                                        icon={'fa-mars-and-venus'}
                                        label={'Gender'}
                                        value={'Male'}
                                    />
                                    <Data
                                        icon={'fa-phone '}
                                        label={'Mobile Phone'}
                                        value={'0812-8623-8911'}
                                    />
                                    <Data
                                        icon={'fa-map-marker'}
                                        label={'Address'}
                                        value={'Perumahan Permata Bintaro Residence C-3'}
                                    />
                                </Col>
                                <Col className='col-md-3' >
                                    <div>
                                        <img src={myImg} alt="" style={{ width: '100%', display: 'block' }} />
                                        <Button
                                            color='danger'
                                            className='danger mt-2'
                                            style={{ width: '100%' }}
                                        >Edit Profile</Button>
                                    </div>
                                </Col>

                            </Row>
                        </Container>
                    </Alert>
                    <h2 className='mt-5 mb-5' >My List Book</h2>
                    <Row>
                        {favorites.map(favorite =>
                            <List
                                id={favorite.id}
                                img={favorite.img}
                                title={favorite.title}
                                author={favorite.author}
                            />
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile