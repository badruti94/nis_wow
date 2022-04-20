import { Alert, Button, Col, Container, Row } from 'reactstrap'
import './landing.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap'
import { API } from '../config/api'

const Login = ({ isOpen, setIsOpen, setRegisterIsOpen }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [alert, setAlert] = useState({
        display: false,
        message: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault()

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

        const body = JSON.stringify(data);

        try {
            const response = await API.post("/login", body, config);

            localStorage.setItem('user', JSON.stringify(response.data.data.user))
            localStorage.setItem('login', JSON.stringify(true))
            localStorage.setItem('token', response.data.data.token)

            if (response.data.data.user.role == 'admin') {
                localStorage.setItem('is_admin', JSON.stringify(true))
                navigate('/transaction')
            } else {
                navigate('/home')
            }
        } catch (error) {
            if (error.response.status == 400) {
                let message
                if (error.response.data.error) {
                    message = error.response.data.error.message
                } else {
                    message = error.response.data.message
                }
                setAlert({
                    display: true,
                    message
                })
            } else {
                console.log(error.response.data);
            }
        }
    }

    const handleRegisterClick = e => {
        e.preventDefault()
        setIsOpen(false)
        setRegisterIsOpen(true)
    }

    return (
        <div>
            <Modal isOpen={isOpen}
                toggle={function noRefCheck() { }}
            >
                <ModalHeader toggle={() => { setIsOpen(false) }}>
                    <h2 className='font-weight-bold mb-lg-3' >Sign In</h2>
                </ModalHeader>
                <ModalBody>
                    {alert.display && <Alert color='danger' >{alert.message}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Input name='email' placeholder='Email' type='email' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input name='password' type='password' placeholder='Password' onChange={handleChange} />
                        </FormGroup>
                        <Button type='submit' className='mt-lg-3 mb-lg-3' color='danger' >Sign In</Button>
                        <p>Don't have an account? Klik <a href="#" onClick={handleRegisterClick} >here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const Register = ({ isOpen, setIsOpen, setLoginIsOpen }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        fullName: '',
        role: 'user'
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async e => {
        e.preventDefault()

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

        const body = JSON.stringify(data);

        const response = await API.post("/register", body, config);

        localStorage.setItem('user', JSON.stringify(response.data.data.user))
        localStorage.setItem('login', JSON.stringify(true))
        localStorage.setItem('token', JSON.stringify(response.data.data.token))
        navigate('/home')
    }

    const handleSignInClick = e => {
        e.preventDefault()
        setIsOpen(false)
        setLoginIsOpen(true)
    }

    return (
        <div>
            <Modal isOpen={isOpen}
                toggle={function noRefCheck() { }}
            >
                <ModalHeader toggle={() => { setIsOpen(false) }}>
                    <h2 className='font-weight-bold mb-lg-3' >Sign Up</h2>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Input name='email' placeholder='Email' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' name='password' placeholder='Password' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input name='fullName' placeholder='Full Name' onChange={handleChange} />
                        </FormGroup>
                        <Button type='submit' className='mt-lg-3 mb-lg-3' color='danger' >Sign Up</Button>
                        <p>Already have an account? Klik <a href="#" onClick={handleSignInClick} >here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

function Landing() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
    const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false)

    return (
        <div className='landing' style={{ backgroundImage: 'url(/background-image.png)' }} >
            <Row >
                <Col>
                    <Container className='ms-lg-5' style={{ marginTop: '100px' }} >
                        <img src='/wow-2.png' alt="" style={{ width: '400px' }} />
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
                setRegisterIsOpen={setRegisterModalIsOpen}
            />
            <Register
                isOpen={registerModalIsOpen}
                setIsOpen={setRegisterModalIsOpen}
                setLoginIsOpen={setLoginModalIsOpen}
            />
        </div>
    );
}

export default Landing;
