import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap'

const Register = ({ isOpen, setIsOpen, setLoginIsOpen }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        fullname: '',
    })

    const handleEmailOnChange = e => {
        setData({ ...data, email: e.target.value })

    }
    const handlePasswordOnChange = e => {
        setData({ ...data, password: e.target.value })
    }
    const handleFullnameOnChange = e => {
        setData({ ...data, fullname: e.target.value })
    }

    const handleSubmit = e => {
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('login', JSON.stringify(true))
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
                    <Form>
                        <FormGroup>
                            <Input placeholder='Email' onChange={handleEmailOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' placeholder='Password' onChange={handlePasswordOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder='Full Name' onChange={handleFullnameOnChange} />
                        </FormGroup>
                        <Button className='mt-lg-3 mb-lg-3' color='danger' onClick={handleSubmit} >Sign Up</Button>
                        <p>Already have an account? Klik <a href="#" onClick={handleSignInClick} >here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Register