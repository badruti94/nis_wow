import React from 'react'
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'

const AddBook = () => {
    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <Container>
                            <h3 className='mt-5 mb-5' >Add Book</h3>
                            <Form>
                                <FormGroup>
                                    <Input
                                        placeholder="Title"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        placeholder="Publication Date"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        placeholder="Pages"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        placeholder="Author"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        placeholder="ISBN"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        placeholder="About This Book"
                                        type='textarea'
                                    />
                                </FormGroup>
                                <FormGroup style={{ width: '300px' }} >
                                    <Input
                                        placeholder="Attache Book File"
                                        type='file'
                                    />
                                </FormGroup>
                                <div className='text-end mb-5' >
                                    <Button color='danger' >Add Book <i className='fa-solid fa-book' ></i> </Button>

                                </div>
                            </Form>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default AddBook