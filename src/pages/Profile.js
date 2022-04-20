import { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import List from '../components/List'
import Sidebar from '../components/Sidebar'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'

const fetchProfileData = async (setProfile, setProfileImage, dispatch) => {
    const userId = JSON.parse(localStorage.getItem('user')).id
    const response = await API.get(`user/${userId}/profile`);
    setProfile(response.data.data.profile)

    if (response.data.data.profile.photo) {
        setProfileImage(response.data.data.profile.photo)
        dispatch({
            type: "SET_IMAGE",
            payload: response.data.data.profile.photo,
        });
    }
}
const EditProfile = (props) => {
    const { isOpen, setIsOpen, setProfile, setProfileImage } = props
    const [img, setImg] = useState()
    const [form, setForm] = useState({
        gender: false,
        phoneNumber: "",
        address: "",
        photo: "",
    });
    const [state, dispatch] = useContext(UserContext);

    const fetchEditProfileData = async () => {
        const userId = JSON.parse(localStorage.getItem('user')).id
        const response = await API.get(`user/${userId}/profile`);
        if (response.data.data.profile != null) {
            setForm({
                ...form,
                gender: response.data.data.profile.gender,
                phoneNumber: response.data.data.profile.phoneNumber,
                address: response.data.data.profile.address,
            })
        }
    }
    useEffect(() => {
        fetchEditProfileData()
    }, [])

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            const file = e.target.files[0]
            setImg(URL.createObjectURL(file))
        }
    }
    const handleChangeRadio = e => {
        const gender = e.target.value == "male" ? true : false
        setForm({
            ...form,
            gender
        })
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

        const userId = JSON.parse(localStorage.getItem('user')).id
        const formData = new FormData();
        formData.set("gender", form.gender);
        formData.set("phoneNumber", form.phoneNumber);
        formData.set("address", form.address);
        if (form.photo) {
            formData.set("photo", form.photo[0], form.photo[0].name);
        }

        (async () => {
            try {
                await API.put(`user/${userId}/profile`, formData, config)
                fetchProfileData(setProfile, setProfileImage, dispatch)
                setIsOpen(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }

    return (
        <div>
            <Modal isOpen={isOpen}
                toggle={function noRefCheck() { }}
            >
                <ModalHeader toggle={() => { setIsOpen(false) }}>
                    <h4 className='font-weight-bold mb-lg-3' >Edit Profile</h4>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit} >
                        <FormGroup>
                            <Label>Gender</Label> <br />
                            <Input name='gender' placeholder='Gender' type='radio' value="male" id='male' onChange={handleChangeRadio} checked={form.gender} /> <Label for='male' >Male</Label> &nbsp;&nbsp;&nbsp;
                            <Input name='gender' placeholder='Gender' type='radio' value="female" id='female' onChange={handleChangeRadio} checked={!form.gender} /> <Label for='female' >Female</Label>
                        </FormGroup>
                        <FormGroup>
                            <Input name='phoneNumber' placeholder='Phone Number' type='text' value={form.phoneNumber} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input name='address' placeholder='Address' type='textarea' value={form.address} onChange={handleChange} />
                        </FormGroup>
                        <InputGroup >
                        </InputGroup>
                        <InputGroup>
                            <div style={{ width: '100%' }} >
                                <Label for='photo' >Photo Profile</Label> <br />
                                <img src={img} alt="" style={{ width: '40%' }} />
                            </div>
                            <Input
                                id='photo'
                                name='photo'
                                placeholder='Attache photo profile'
                                type='file'
                                accept='image/*'
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <Button type='submit' className='mt-lg-3 mb-lg-3' color='danger' >Update</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const Data = (props) => {
    const { icon, label, value } = props
    return (
        <Row className='text-secondary' >
            <Col className='col-sm-1 me-1' ><i className={`fa-solid ${icon} fa-2x mt-2`} style={{ width: '200px' }} ></i></Col>
            <Col>
                <p><span className='text-dark fw-bold' >{value}</span> <br />
                    {label}</p>
            </Col>
        </Row>
    )
}

const Profile = () => {
    const [favorites, setFavorites] = useState([])
    const [profileImage, setProfileImage] = useState('profile-image.jpg')
    const [profile, setProfile] = useState({
        gender: null,
        phoneNumber: "",
        address: "",
    })
    const [isOpen, setIsOpen] = useState(false)
    const [state, dispatch] = useContext(UserContext);
    const email = JSON.parse(localStorage.getItem('user')).email

    useEffect(() => {
        try {
            (async () => {
                const userId = JSON.parse(localStorage.getItem('user')).id
                let response = await API.get(`/user/${userId}/favorite`);
                setFavorites(response.data.data.favorites);
                fetchProfileData(setProfile, setProfileImage, dispatch)
            })()
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <h2 className='mt-4 mb-4' >Profile</h2>
                    <Alert color='danger' >
                        <Container>
                            <Row>
                                <Col>
                                    <Data
                                        icon={'fa-envelope'}
                                        label={'Email'}
                                        value={email}
                                    />
                                    <Data
                                        icon={'fa-mars-and-venus'}
                                        label={'Gender'}
                                        value={profile?.gender ? "Male" : "Female"}
                                    />
                                    <Data
                                        icon={'fa-phone '}
                                        label={'Mobile Phone'}
                                        value={profile?.phoneNumber}
                                    />
                                    <Data
                                        icon={'fa-map-marker'}
                                        label={'Address'}
                                        value={profile?.address}
                                    />
                                </Col>
                                <Col className='col-md-3' >
                                    <div>
                                        <img src={'http://localhost:3000/uploads/' + profileImage} alt="" style={{ width: '100%', display: 'block' }} />
                                        <EditProfile
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen}
                                            setProfile={setProfile}
                                            setProfileImage={setProfileImage}
                                        />
                                        <Button
                                            color='danger'
                                            className='danger mt-2'
                                            style={{ width: '100%' }}
                                            onClick={() => setIsOpen(true)}
                                        >Edit Profile</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Alert>
                    <h2 className='mt-5 mb-5' >My List Book</h2>
                    <Row>
                        {favorites && favorites.map(favorite =>
                            <List
                                key={favorite.book.id}
                                id={favorite.book.id}
                                img={favorite.book.cover}
                                title={favorite.book.title}
                                author={favorite.book.author}
                            />
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile