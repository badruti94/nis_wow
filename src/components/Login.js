import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap'

const Login = ({ isOpen, setIsOpen }) => {
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
                            <Input placeholder='Email' />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' placeholder='Password' />
                        </FormGroup>
                        <Button className='mt-lg-3 mb-lg-3' color='danger' >Sign In</Button>
                        <p>Don't have an account? Klik <a href="#">here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Login