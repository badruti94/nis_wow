import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Card, CardBody, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const fetchData = async (setBooks) => {
    const response = await API.get("/books");
    setBooks(response.data.data.books);
}

const BookDeleteModal = (props) => {
    const { isOpen, setIsOpen, id, setBooks, setAlert } = props

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
                await API.delete("/book/" + id, config);
                setAlert({
                    display: true,
                    color: 'success',
                    message: 'Book deleted successfully'
                })
                fetchData(setBooks)
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
                <h4 className='font-weight-bold mb-lg-3' >Delete book</h4>
            </ModalHeader>
            <ModalBody className='text-center' >
                Are you sure want to delete this book?
            </ModalBody>
            <ModalFooter className='justify-content-between' >
                <Button type='submit' className='ms-lg-5' color='success' onClick={handleYes} >Yes</Button>
                <Button type='submit' className='me-lg-5' color='danger' onClick={() => { setIsOpen(false) }} >No</Button>
            </ModalFooter>
        </Modal>)
}
const TableRow = (props) => {
    const { no, id, title, author, pages, isbn, handleDeleteButton } = props
    const [display, setDisplay] = useState('d-none')
    const navigate = useNavigate()

    const handleEdit = async () => {
        navigate('/edit-book/' + id)
    }

    return (
        <tr>
            <th scope="row" className='fw-normal'>
                {no}
            </th>
            <td>
                {title}
            </td>
            <td>
                {author}
            </td>
            <td>
                {pages}
            </td>
            <td>
                {isbn}
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
                        <div onClick={handleEdit} style={{ cursor: 'pointer' }} ><span className='text-success' >Edit</span></div>
                        <div
                            onClick={() => { handleDeleteButton(id) }}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className='text-danger' >Delete</span>
                        </div>
                    </CardBody>
                </Card>
            </td>
        </tr>
    )
}

const Book = () => {
    const [books, setBooks] = useState()
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
            fetchData(setBooks)
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
                        <h3 className='mt-5 mb-5' >Books</h3>
                        <Link className='btn btn-success text-white text-decoration-none' to={'/add-book'}><i className="fa-solid fa-book"></i> Add Book</Link>
                        {alert.display ? <Alert className='mt-3' color={alert.color} >{alert.message}</Alert> : <></>}
                        <BookDeleteModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            id={id}
                            setBooks={setBooks}
                            setAlert={setAlert}
                        />
                        <Table striped borderless>
                            <thead className='text-danger' >
                                <tr>
                                    <th>
                                        No
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Author
                                    </th>
                                    <th>
                                        Pages
                                    </th>
                                    <th>
                                        ISBN
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map((book, i) => <TableRow
                                    key={book.id}
                                    no={i + 1}
                                    id={book.id}
                                    title={book.title}
                                    author={book.author}
                                    pages={book.pages}
                                    isbn={book.isbn}
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

export default Book