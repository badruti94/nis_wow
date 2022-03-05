import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap'

const Login = ({ isOpen, setIsOpen, setRegisterIsOpen }) => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleEmailOnChange = e => {
        setData({ ...data, email: e.target.value })

    }
    const handlePasswordOnChange = e => {
        setData({ ...data, password: e.target.value })
    }

    const handleSubmit = e => {
        if (data.email === 'admin@gmail.com') {
            localStorage.setItem('user', JSON.stringify({
                email: 'admin@gmail.com',
                password: 'admin',
                fullname: 'Admin',
            }))
            localStorage.setItem('login', JSON.stringify(true))
            localStorage.setItem('is_admin', JSON.stringify(true))
            navigate('/home')
        } else {
            localStorage.setItem('user', JSON.stringify({ ...data, fullname: 'Tes tes' }))
            localStorage.setItem('login', JSON.stringify(true))
            navigate('/home')
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
                    <Form>
                        <FormGroup>
                            <Input placeholder='Email' type='email' onChange={handleEmailOnChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' placeholder='Password' onChange={handlePasswordOnChange} />
                        </FormGroup>
                        <Button className='mt-lg-3 mb-lg-3' color='danger' onClick={handleSubmit} >Sign In</Button>
                        <p>Don't have an account? Klik <a href="#" onClick={handleRegisterClick} >here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Login