import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap'

const Register = ({ isOpen, setIsOpen }) => {
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
                            <Input placeholder='Email' />
                        </FormGroup>
                        <FormGroup>
                            <Input type='password' placeholder='Password' />
                        </FormGroup>
                        <FormGroup>
                            <Input placeholder='Full Name' />
                        </FormGroup>
                        <Button className='mt-lg-3 mb-lg-3' color='danger' >Sign Up</Button>
                        <p>Already have an account? Klik <a href="#">here</a></p>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Register