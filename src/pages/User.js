import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const fetchData = async (setUsers) => {
    const response = await API.get("/users");
    setUsers(response.data.data.users);
}

const UserDeleteModal = (props) => {
    const { isOpen, setIsOpen, id, setUsers, setAlert } = props

    const handleYes = () => {
        (async () => {
            try {
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
                await API.delete("/user/" + id, config);
                setAlert({
                    display: true,
                    color: 'success',
                    message: 'User deleted successfully'
                })
                fetchData(setUsers)
            } catch (error) {
                setAlert({
                    display: true,
                    color: 'danger',
                    message: error.response.data.message
                })
            }
            setIsOpen(false)
        })()
    }

    return (
        <Modal isOpen={isOpen}
            style={{ maxWidth: '350px' }}
            toggle={function noRefCheck() { }}
        >
            <ModalHeader toggle={() => { setIsOpen(false) }}>
                <h4 className='font-weight-bold mb-lg-3' >Delete User</h4>
            </ModalHeader>
            <ModalBody className='text-center' >
                Are you sure want to delete this user?
            </ModalBody>
            <ModalFooter className='justify-content-between' >
                <Button type='submit' className='ms-lg-5' color='success' onClick={handleYes} >Yes</Button>
                <Button type='submit' className='me-lg-5' color='danger' onClick={() => { setIsOpen(false) }} >No</Button>
            </ModalFooter>
        </Modal>)
}
const TableRow = (props) => {
    const { no, id, name, email, handleDeleteButton } = props
    const [display, setDisplay] = useState('d-none')

    return (
        <tr>
            <th scope="row" className='fw-normal'>
                {no}
            </th>
            <td>
                {name}
            </td>
            <td>
                {email}
            </td>
            <td>
                <i
                    className="fa-solid fa-sort-desc fa-2x text-primary"
                    onMouseEnter={() => { setDisplay('') }}
                ></i>
                <Card
                    className={display} style={{ position: 'absolute' }}
                    onMouseLeave={() => { setDisplay('d-none') }}
                >
                    <CardBody>
                        <div onClick={() => { handleDeleteButton(id) }} style={{ cursor: 'pointer' }} >
                            <span className='text-danger' >Delete</span>
                        </div>
                    </CardBody>
                </Card>
            </td>
        </tr>
    )
}

const User = () => {
    const [users, setUsers] = useState()
    const [alert, setAlert] = useState({
        display: false,
        color: "",
        message: ""
    })
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState()

    const handleDeleteButton = id => {
        setId(id)
        setIsOpen(true)
    }

    useEffect(() => {
        try {
            fetchData(setUsers)
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <h3 className='mt-5 mb-5' >Users</h3>
                        {alert.display ? <Alert className='mt-3' color={alert.color} >{alert.message}</Alert> : <></>}
                        <UserDeleteModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} setUsers={setUsers} setAlert={setAlert} />
                        <Table striped borderless>
                            <thead className='text-danger' >
                                <tr>
                                    <th>
                                        No
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map((user, i) => <TableRow
                                    key={user.id}
                                    no={i + 1}
                                    id={user.id}
                                    name={user.fullName}
                                    email={user.email}
                                    handleDeleteButton={handleDeleteButton}
                                />)}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default User