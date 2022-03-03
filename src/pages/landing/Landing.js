import { Button, Col, Container, Row } from 'reactstrap'
import './landing.css'
import wow from './wow.png'
import Login from '../../components/Login'
import Register from '../../components/Register'
import { useState } from 'react'

function Landing() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false)

    return (
        <div className='landing' >
            <Row >
                <Col>
                    <Container className='ms-lg-5' style={{ marginTop: '100px' }} >
                        <img src={wow} alt="" style={{ width: '400px' }} />
                        <p style={{ width: '400px' }} >Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
                        <div>
                            <Button
                                className='me-5'
                                color='danger'
                                onClick={() => { setRegisterModalIsOpen(true) }}
                            >Sign Up</Button>
                            <Button
                                className='me-5'
                                color='secondary'
                                onClick={() => { setLoginModalIsOpen(true) }}
                            >Sign In</Button>
                        </div>
                    </Container>
                </Col>
                <Col></Col>
            </Row>
            <Login
                isOpen={loginModalIsOpen}
                setIsOpen={setLoginModalIsOpen}
            />
            <Register
                isOpen={registerModalIsOpen}
                setIsOpen={setRegisterModalIsOpen}
            />
        </div>
    );
}

export default Landing;
