import { useState } from 'react'
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const AddBook = () => {
    const [img, setImg] = useState()
    const [alert, setAlert] = useState({
        display: false,
        color: '',
        message: '',
    })
    const [form, setForm] = useState({
        title: "",
        publicationDate: "",
        pages: "",
        author: "",
        isbn: "",
        about: "",
        bookFile: "",
        cover: "",
    });

    const handleOnChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            const file = e.target.files[0]
            setImg(URL.createObjectURL(file))
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        let token;
        try {
            token = JSON.parse(localStorage.token)
        } catch (error) {
            token = localStorage.token

        }
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        };

        const formData = new FormData();
        formData.set("title", form.title);
        formData.set("publicationDate", form.publicationDate);
        formData.set("pages", form.pages);
        formData.set("author", form.author);
        formData.set("isbn", form.isbn);
        formData.set("about", form.about);
        if (form.bookFile != "" && form.bookFile != null) {
            formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);
        }
        if (form.cover != "" && form.cover != null) {
            formData.set("cover", form.cover[0], form.cover[0].name);
        }

        (async () => {
            try {
                await API.post("/book", formData, config)
                setForm({
                    title: "",
                    publicationDate: "",
                    pages: "",
                    author: "",
                    isbn: "",
                    about: "",
                    bookFile: null,
                    cover: null,
                })
                setImg(null)
                setAlert({
                    display: true,
                    color: 'success',
                    message: 'Added successfully'
                })
            } catch (error) {
                setAlert({
                    display: true,
                    color: 'danger',
                    message: error.response.data.message
                })
            }
        })()
    }

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Container>
                        <Container>
                            <h3 className='mt-5 mb-5' >Add Book</h3>
                            {alert.display ? <Alert color={alert.color} >{alert.message}</Alert> : <></>}
                            <Form onSubmit={handleSubmit} >
                                <FormGroup>
                                    <Input
                                        name='title'
                                        value={form.title}
                                        onChange={handleOnChange}
                                        placeholder="Title"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        name='publicationDate'
                                        value={form.publicationDate}
                                        onChange={handleOnChange}
                                        placeholder="Publication Date"
                                        type='date'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        name='pages'
                                        value={form.pages}
                                        onChange={handleOnChange}
                                        placeholder="Pages"
                                        type='number'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        name='author'
                                        value={form.author}
                                        onChange={handleOnChange}
                                        placeholder="Author"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        name='isbn'
                                        value={form.isbn}
                                        onChange={handleOnChange}
                                        placeholder="ISBN"
                                        type='number'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        name='about'
                                        value={form.about}
                                        onChange={handleOnChange}
                                        placeholder="About This Book"
                                        type='textarea'
                                    />
                                </FormGroup>
                                <FormGroup style={{ width: '300px' }} >
                                    <Label>Book File</Label>
                                    <Input
                                        name='bookFile'
                                        onChange={handleOnChange}
                                        placeholder="Attache Book File"
                                        type='file'
                                        accept='.epub'
                                    />
                                </FormGroup>
                                <img src={img} alt="" style={{ width: '200px' }} />
                                <FormGroup style={{ width: '300px' }} >
                                    <Label>Book Cover</Label>
                                    <Input
                                        name='cover'
                                        onChange={handleOnChange}
                                        placeholder="Attache Book Cover"
                                        type='file'
                                        accept='image/*'
                                    />
                                </FormGroup>
                                <div className='text-end mb-5' >
                                    <Button color='danger' type='submit' >Add Book <i className='fa-solid fa-book' ></i> </Button>
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