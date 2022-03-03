import React from 'react'
import { Button, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import wow from './wow.png'

const Subcribe = () => {
    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <div style={{ marginTop: '150px' }} ></div>
                    <div className='text-center m-auto' style={{ width: '400px' }} >
                        <h3 className='mb-3' >Premium</h3>
                        <p>Pay now and access all the latest books from <img src={wow} alt="" /></p>
                        <p><img src={wow} alt="" />: 0981312323</p>
                        <Form className='m-auto' style={{ width: '300px' }} >
                            <InputGroup className='mb-3' >
                                <Input placeholder='Input your account number' />
                            </InputGroup>
                            <InputGroup className='mb-5' >
                                <Input
                                    placeholder='Attache proof of transfer'
                                    type='file'
                                />
                            </InputGroup>
                            <Button color='danger' style={{ width: '100%' }} >
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