import { useState } from 'react'
import { Alert, Button, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'

const Subcribe = () => {
    const [img, setImg] = useState()
    const [alert, setAlert] = useState({
        display: false,
        color: '',
        message: ''
    })
    const [form, setForm] = useState({
        accountNumber: "",
        transferProof: "",
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
        const userId = JSON.parse(localStorage.getItem('user')).id
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
        formData.set("userId", userId);
        formData.set("accountNumber", form.accountNumber);
        formData.set("transferProof", form.transferProof[0], form.transferProof[0].name);

        (async () => {
            try {
                await API.post("/transaction", formData, config)
                setForm({
                    accountNumber: "",
                    transferProof: null,
                })
                setImg(null)
                setAlert({
                    display: true,
                    color: 'success',
                    message: 'Thank you for subcribing to premium, your premium package will be active after our admin approves your transaction. Thank you'
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
                <Col className='mb-5'>
                    <div style={{ marginTop: '150px' }} ></div>
                    <div className='text-center m-auto' style={{ width: '400px' }} >
                        {alert.display ? <Alert color={alert.color} >{alert.message}</Alert> : <></>}
                        <h3 className='mb-3' >Premium</h3>
                        <p>Pay now and access all the latest books from <img src="/wow.png" alt="" /></p>
                        <p><img src="/wow.png" alt="" />: 0981312323</p>
                        <Form className='m-auto' style={{ width: '300px' }} >
                            <InputGroup className='mb-3' >
                                <Input
                                    name='accountNumber'
                                    placeholder='Input your account number'
                                    onChange={handleOnChange}
                                    value={form.accountNumber}
                                />
                            </InputGroup>
                            <img src={img} alt="" style={{ width: '100%' }} />
                            <InputGroup className='mb-5 mt-3' >
                                <Input
                                    name='transferProof'
                                    placeholder='Attache proof of transfer'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleOnChange}
                                />
                            </InputGroup>
                            <Button
                                color='danger'
                                style={{ width: '100%' }}
                                onClick={handleSubmit}
                            >
                                Send
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Subcribe