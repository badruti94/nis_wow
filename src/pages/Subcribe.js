import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import wow from './wow.png'

const Subcribe = () => {
    const navigate = useNavigate()
    const [img, setImg] = useState()
    const [alert, setAlert] = useState(false)

    const handleImageOnChange = e => {
        const file = e.target.files[0]
        setImg(URL.createObjectURL(file))
        console.log(URL.createObjectURL(file));
    }

    const handleSubmit = e => {
        localStorage.setItem('is_subcribe', JSON.stringify(true))
        setAlert(true)
        navigate('/subcribe')
    }

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col className='mb-5'>
                    <div style={{ marginTop: '150px' }} ></div>
                    <div className='text-center m-auto' style={{ width: '400px' }} >
                        {alert ? <Alert color='success' >Thank you for subcribing to premium, your premium package will be active after our admin approves your transaction. Thank you</Alert> : <></>}
                        <h3 className='mb-3' >Premium</h3>
                        <p>Pay now and access all the latest books from <img src={wow} alt="" /></p>
                        <p><img src={wow} alt="" />: 0981312323</p>
                        <Form className='m-auto' style={{ width: '300px' }} >
                            <InputGroup className='mb-3' >
                                <Input placeholder='Input your account number' />
                            </InputGroup>
                            <img src={img} alt="" style={{ width: '100%' }} />
                            <InputGroup className='mb-5 mt-3' >
                                <Input
                                    placeholder='Attache proof of transfer'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageOnChange}
                                />
                            </InputGroup>
                            <Button
                                color='danger'
                                style={{ width: '100%' }}
                                onClick={handleSubmit}
                            >
                                Send
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Subcribe